# Copilot / AI Agent Instructions for bw-pool-ui

Short, actionable guidance to help AI coding agents be productive in this repository.

- **Project type:** Expo React Native app using Expo Router + TypeScript. Entry layout: [app/\_layout.tsx](app/_layout.tsx).
- **Run / dev commands:** Use `npm start` to launch the Expo bundler (mobile + web). For the local mock web server run `npm run server` (serves [service/postData.js](service/postData.js) on port 3002).
- **Tests:** Jest preset is `jest-expo`. Run `npm test` (watch+coverage), `npm run testFinal` for non-interactive runs, and `npm run updateSnapshots` to update snapshots.
- **TypeScript config:** `tsconfig.json` sets `baseUrl` and a path alias `@/* -> ./*`. Prefer imports like `@/firebase-config`.

- **Architecture (big picture):**

  - UI lives under `app/` and follows a feature-oriented layout. Example: car-pooling screens under `app/screens/carPool/` with nested `newPost` feature.
  - Navigation uses Expo Router entry + a manual navigator tree: see `app/_layout.tsx` (entry) and `app/navigation/rootNavigator.tsx` (Drawer/Stack/TopTabs composition).
  - Shared UI pieces live in `app/common/` (components, hooks, utils). Tests and snapshots are colocated under `__tests__` and `__snapshots__` directories.
  - Lightweight backend/mocks live in the repo root `service/` (e.g., `service/postData.js`) and a Firestore helper in `service/service.ts`.

- **Project-specific conventions & patterns:**

  - Feature-first layout: create a folder per feature (component + styles + tests), or a single file for smaller components. See `app/common/components` and `app/screens/carPool/`.
  - Expo Router pattern: do not add a top-level `NavigationContainer` when using the Router. Root layout already wires navigation in `app/_layout.tsx`.
  - Theme handling: theme state is lifted in `app/navigation/rootNavigator.tsx`; follow its `ThemeType` usage for theme-related work.
  - Service wrappers: Firestore access goes through `FirestoreService` in `service/service.ts`—use it rather than direct Firestore SDK calls when adding simple CRUD.

- **Important files to consult for patterns:**

  - `app/_layout.tsx` — app entry, font loading, SplashScreen handling.
  - `app/navigation/rootNavigator.tsx` — Drawer + Stack + TopTab composition and theme handling.
  - `app/common/components` — examples of component structure and test placement.
  - `service/service.ts` and `service/postData.js` — mock server and Firestore helper patterns.
  - `package.json` — scripts (start, server, test, updateSnapshots).

- **Build / debug tips:**

  - Mobile: `npm start` then scan QR with Expo Go. Web: `npm start` opens web bundler; the repo includes a simple Express mock server for web at port 3002 (`npm run server`).
  - Tests and snapshots: run `npm test` for watch mode; use `npm run updateSnapshots` when intentionally changing UI output.
  - Type errors: TypeScript is `strict`; prefer updating types/interfaces in `app/common/models` (e.g., `themeType.ts`) when adding new props.

- **What to avoid / common pitfalls:**
  - Don't add a separate `NavigationContainer` if following existing Expo Router patterns — it breaks Router behavior.
  - Avoid bypassing `FirestoreService` for straightforward reads/writes; it centralizes data access patterns and is easier to mock in tests.

If any of these areas need more detail (examples, additional commands, or CI info), tell me which section to expand. Thanks!
