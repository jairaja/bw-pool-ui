This folder contains Firebase Cloud Functions to send FCM topic notifications when `poolingPosts` documents are created or deleted.

Setup

1. Install dependencies:

```bash
cd functions
npm install
```

2. Deploy (requires Firebase CLI and project configured):

```bash
# from repo root
cd functions
firebase deploy --only functions
```

Notes for the client app

- This function sends messages to the topic `pooling-posts`.
- Devices should subscribe to this topic to receive notifications when the app is backgrounded/killed.
  - For native/Expo-managed apps, obtain FCM device token and call `admin.messaging().subscribeToTopic` from a secure server, or use the client SDK to subscribe to a topic where supported.
  - Alternatively, store user device tokens in Firestore and send targeted messages from the function.

HTTP helper endpoints

- `subscribeDevice` - POST a JSON body `{ "token": "<device_fcm_token>" }` to subscribe that device token to the `pooling-posts` topic.
- `unsubscribeDevice` - POST `{ "token": "<device_fcm_token>" }` to unsubscribe.

Example client call (fetch):

```js
await fetch("https://<REGION>-<PROJECT>.cloudfunctions.net/subscribeDevice", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ token: "<FCM_DEVICE_TOKEN>" }),
});
```

Replace `<REGION>-<PROJECT>` with the URL shown after deploying functions.

Security

- Do NOT commit service account keys. Use the Firebase project settings and `firebase login` for deploys or configure CI secrets.

Testing locally

- Use the Firebase emulator suite to run functions and messaging emulation where possible, or deploy to a test project.

CI / GitHub Actions

1. Create a CI token locally: `firebase login:ci` and copy the generated token.
2. In your GitHub repository, add the following repository secrets:

- `FIREBASE_TOKEN`: the token from step 1
- `FIREBASE_PROJECT_ID`: your Firebase project id (e.g., `bw-pool-baas`)

3. A workflow file is provided at `.github/workflows/deploy-functions.yml` which will
   install dependencies and deploy the `functions/` folder to Firebase on pushes to `main`.

Notes

- For enhanced security you can instead use a service account and `gcloud` authentication; the workflow here uses a CI token for simplicity.
- Ensure `firebase-tools` versions in CI match your local expectations if you rely on CLI-specific features.
