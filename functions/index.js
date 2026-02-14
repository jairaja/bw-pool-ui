const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Initialize the Admin SDK (will use environment credentials when deployed)
try {
  admin.initializeApp();
} catch (e) {
  // ignore if already initialized in local emulators
}

const TOPIC = "pooling-posts";

exports.onPoolingPostCreated = functions.firestore
  .document("poolingPosts/{postId}")
  .onCreate(async (snap, context) => {
    let data = snap.data() || {};
    // Server-side validation/normalization of `startingWhen` field
    try {
      const raw = data.startingWhen;
      // If it's a Firestore Timestamp (has toDate), assume valid
      if (raw && typeof raw.toDate === "function") {
        // ok
      } else if (typeof raw === "string" || typeof raw === "number") {
        const parsed = new Date(raw);
        if (!isNaN(parsed.getTime())) {
          // update document to normalized Timestamp
          await admin
            .firestore()
            .doc(snap.ref.path)
            .update({
              startingWhen: admin.firestore.Timestamp.fromDate(parsed),
            });
          data = {
            ...data,
            startingWhen: admin.firestore.Timestamp.fromDate(parsed),
          };
        } else {
          // invalid string/number -> set server timestamp
          await admin.firestore().doc(snap.ref.path).update({
            startingWhen: admin.firestore.FieldValue.serverTimestamp(),
          });
          data = {
            ...data,
            startingWhen: admin.firestore.FieldValue.serverTimestamp(),
          };
        }
      } else if (!raw) {
        // missing -> set server timestamp
        await admin.firestore().doc(snap.ref.path).update({
          startingWhen: admin.firestore.FieldValue.serverTimestamp(),
        });
        data = {
          ...data,
          startingWhen: admin.firestore.FieldValue.serverTimestamp(),
        };
      }
    } catch (e) {
      console.error("Error normalizing startingWhen:", e);
    }
    const title = data.fromTo || "New pooling post";
    const title = data.fromTo || "New pooling post";
    const body = data.notes || "A new pooling post was added.";

    const message = {
      notification: { title, body },
      data: { postId: snap.id, event: "created" },
      topic: TOPIC,
    };

    try {
      const resp = await admin.messaging().send(message);
      console.log("Sent create notification:", resp);
      return resp;
    } catch (err) {
      console.error("Error sending create notification", err);
      throw err;
    }
  });

exports.onPoolingPostDeleted = functions.firestore
  .document("poolingPosts/{postId}")
  .onDelete(async (snap, context) => {
    const data = snap.data() || {};
    const title = "Pooling post removed";
    const body = data.fromTo || "A pooling post was deleted.";

    const message = {
      notification: { title, body },
      data: { postId: snap.id, event: "deleted" },
      topic: TOPIC,
    };

    try {
      const resp = await admin.messaging().send(message);
      console.log("Sent delete notification:", resp);
      return resp;
    } catch (err) {
      console.error("Error sending delete notification", err);
      throw err;
    }
  });

// HTTP endpoints to subscribe/unsubscribe device tokens to the topic
exports.subscribeDevice = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  const token = req.body?.token || req.query?.token;
  if (!token) {
    res.status(400).json({ error: "Missing token" });
    return;
  }

  try {
    const resp = await admin.messaging().subscribeToTopic([token], TOPIC);
    console.log("Subscribed token to topic:", resp);
    res.json({ success: true, resp });
  } catch (err) {
    console.error("Error subscribing token", err);
    res.status(500).json({ error: err?.message || String(err) });
  }
});

exports.unsubscribeDevice = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  const token = req.body?.token || req.query?.token;
  if (!token) {
    res.status(400).json({ error: "Missing token" });
    return;
  }

  try {
    const resp = await admin.messaging().unsubscribeFromTopic([token], TOPIC);
    console.log("Unsubscribed token from topic:", resp);
    res.json({ success: true, resp });
  } catch (err) {
    console.error("Error unsubscribing token", err);
    res.status(500).json({ error: err?.message || String(err) });
  }
});
