import React, { useState } from "react";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerNavigator from "./drawerNavigator";
import Pooling from "../screens/pooling";
import About from "../screens/about";
import Announcements from "../screens/announcements";
import Settings from "../screens/settings";
import Profile from "../screens/profile";
import { useColorScheme } from "react-native";
import { ThemeType } from "../models/themeType";

const Drawer = createDrawerNavigator();
const HtmlGrayColors = {
  dimGray: "rgb(105,105,105)",
  gray: "rgb(128,128,128)",
  darkGray: "rgb(169,169,169)",
  lightGray: "rgb(211,211,211)",
};

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

  // const updated;

  const currentThemeColors =
    currentTheme === "dark"
      ? {
          dark: DarkTheme.dark,
          colors: {
            ...DarkTheme.colors,
            ...HtmlGrayColors,
            themedGray: HtmlGrayColors.dimGray,
          },
        }
      : {
          dark: DefaultTheme.dark,
          colors: {
            ...DefaultTheme.colors,
            ...HtmlGrayColors,
            themedGray: HtmlGrayColors.lightGray,
          },
        };

  return (
    <NavigationContainer independent theme={currentThemeColors}>
      <Drawer.Navigator
        drawerContent={DrawerNavigator}
        initialRouteName="Pooling"
        backBehavior="history"
        screenOptions={{
          headerStyle: {
            backgroundColor: currentThemeColors.colors.themedGray,
            // elevation: 4, // shadow
            // shadowOffset
          },
        }}
      >
        <Drawer.Screen name="Pooling" component={Pooling} />
        <Drawer.Screen name="Announcements" component={Announcements} />
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
