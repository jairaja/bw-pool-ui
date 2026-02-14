import "react-native-gesture-handler";
import React, { useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import RootNavigator from "./navigation/rootNavigator";
import { FirestoreService } from "./service/service";
import useStore from "./common/state/store";
import { Provider as PaperProvider } from "react-native-paper";
import { Platform } from "react-native";
import { firebaseApp } from "@/firebase-config";
import fcmHelper from "@/app/common/utils/fcm";
import * as Notifications from "expo-notifications";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("./assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Fetch initial posts into the global Zustand store once fonts/assets are loaded
  useEffect(() => {
    if (!loaded) return;
    let mounted = true;

    // Subscribe to realtime updates for poolingPosts and update the global store
    const unsubscribe = FirestoreService.subscribe(
      "poolingPosts",
      (posts: any[]) => {
        if (!mounted) return;
        useStore.getState().setPosts(posts as any[]);
        console.log("Realtime posts updated:", posts?.length ?? 0);
      },
      {
        where: ["startingWhen", ">", Date.now()],
        orderBy: ["startingWhen", "asc"],
        limit: 20,
      },
    );

    return () => {
      mounted = false;
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [loaded]);

  // Acquire web FCM token and subscribe to topic (web only).
  useEffect(() => {
    if (!loaded) return;
    if (Platform.OS !== "web") return;

    let mounted = true;

    (async () => {
      try {
        const messagingModule = await import("firebase/messaging");
        const { getMessaging, getToken } = messagingModule;
        const messaging = getMessaging(firebaseApp);

        // VAPID key should be provided via env/global. Replace as needed.
        const vapidKey =
          (global as any).__VAPID_KEY ||
          process.env.EXPO_PUBLIC_VAPID_KEY ||
          "";
        if (!vapidKey) {
          console.warn(
            "VAPID key not configured; skipping web token acquisition.",
          );
          return;
        }

        const token = await getToken(messaging, { vapidKey });
        if (!mounted) return;
        if (token) {
          console.log(
            "Web FCM token acquired:",
            token.substring(0, 12) + "...",
          );
          await fcmHelper.subscribeTokenToTopic(token);
          console.log("Subscribed web token to pooling-posts topic");
        }
      } catch (err) {
        console.error("Failed to acquire or subscribe web FCM token:", err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [loaded]);

  // Native (Expo) push token acquisition and subscribe
  useEffect(() => {
    if (!loaded) return;
    if (Platform.OS === "web") return;

    let mounted = true;

    (async () => {
      try {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          console.warn("Push notifications permission not granted");
          return;
        }

        const tokenResp = await Notifications.getDevicePushTokenAsync();
        const deviceToken = tokenResp?.data;
        if (!deviceToken) {
          console.warn("No device push token returned");
          return;
        }

        if (!mounted) return;
        console.log(
          "Native device push token:",
          deviceToken.substring?.(0, 12) + "...",
        );
        await fcmHelper.subscribeTokenToTopic(deviceToken);
        console.log("Subscribed native token to pooling-posts topic");
      } catch (err) {
        console.error("Failed to get/subscribe native push token:", err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Can be used for hiding splash screen
  // <SafeAreaProvider onLayout={onLayoutRootView}>
  // const onLayoutRootView = React.useCallback(async () => {
  //   if (loaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1 }}
          // style={{ flex: 1, paddingBottom: 10 }}
          edges={["top", "bottom"]}
        >
          <RootNavigator />
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
