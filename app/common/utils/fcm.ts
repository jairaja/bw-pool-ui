// Helper to call Cloud Functions endpoints for subscribing/unsubscribing
// device FCM tokens to the `pooling-posts` topic.

const FUNCTIONS_BASE_URL =
  // Set this in your environment or replace with your deployed functions URL
  // Example: https://us-central1-your-project.cloudfunctions.net
  (global as any).__FUNCTIONS_BASE_URL || "";

async function postJson(path: string, body: any) {
  if (!FUNCTIONS_BASE_URL) {
    throw new Error(
      "FUNCTIONS_BASE_URL is not configured. Set (global).__FUNCTIONS_BASE_URL or replace FUNCTIONS_BASE_URL in app/common/utils/fcm.ts",
    );
  }

  const url = `${FUNCTIONS_BASE_URL.replace(/\/$/, "")}/${path}`;
  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`Request failed ${resp.status}: ${txt}`);
  }

  return resp.json();
}

export async function subscribeTokenToTopic(token: string) {
  return postJson("subscribeDevice", { token });
}

export async function unsubscribeTokenFromTopic(token: string) {
  return postJson("unsubscribeDevice", { token });
}

export default { subscribeTokenToTopic, unsubscribeTokenFromTopic };
