import "react-native-gesture-handler";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./navigation/RootNavigator";
import { Provider as PaperProvider } from "react-native-paper";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

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
  React.useEffect(() => {
    if (error) throw error;
  }, [error]);

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
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
        <RootNavigator />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
