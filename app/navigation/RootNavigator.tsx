import React, { useState } from "react";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerNavigator from "./DrawerNavigator";
import Pooling from "../screens/pooling";
import About from "../screens/about";
import Announcements from "../screens/announcements";
import Settings from "../screens/settings";
import Profile from "../screens/profile";
import { useColorScheme } from "react-native";
import { ThemeType } from "../models/themeType";

const Drawer = createDrawerNavigator();

function RootNavigator() {
  // TODO - pick last saved theme value or from user's preferences
  const systemTheme = useColorScheme() ?? "light";

  const [themeValueForSettingsScreen, setThemeValueForSettingsScreen] =
    useState<ThemeType>(systemTheme);

  const [currentTheme, setCurrentTheme] =
    useState<Exclude<ThemeType, "system">>(systemTheme);

  const updateTheme = function (newTheme: ThemeType) {
    const selectedTheme = newTheme === "system" ? systemTheme : newTheme;
    setCurrentTheme(selectedTheme);
    setThemeValueForSettingsScreen(newTheme);
  };

  return (
    <NavigationContainer
      independent
      theme={currentTheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Drawer.Navigator drawerContent={DrawerNavigator}>
        <Drawer.Screen name="Pooling" component={Pooling} />
        <Drawer.Screen name="Announcements" component={Announcements} />
        {/* <Drawer.Screen name="Settings">
          {() => (
            <Settings
              currentTheme={themeValueForSettingsScreen}
              updateTheme={updateTheme}
            />
          )}
        </Drawer.Screen> */}
        <Drawer.Screen
          name="Settings"
          children={() => (
            <Settings
              currentTheme={themeValueForSettingsScreen}
              updateTheme={updateTheme}
            />
          )}
        />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
