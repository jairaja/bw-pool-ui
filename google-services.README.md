Place your Android `google-services.json` here so native Firebase and FCM work.

Steps

1. In the Firebase Console, open your project and go to Project settings → Your Apps (Android).
2. Register an Android app whose package name matches `com.bwpoolui` (or update `expo.android.package` in `app.json`).
3. Download the `google-services.json` file from Firebase.
4. Save the file at the repo root as `google-services.json` (replace the example file if present).
5. Rebuild the native app (Expo dev client) so the native Firebase configuration is included:

   eas build -p android --profile development

Notes

- Do NOT commit your real `google-services.json` to a public repository if it contains sensitive information. If necessary, add it to `.gitignore` and use secure distribution for CI/EAS.
- `app.json` already contains the entry `android.googleServicesFile: "./google-services.json"` so EAS will pick it up during builds.
