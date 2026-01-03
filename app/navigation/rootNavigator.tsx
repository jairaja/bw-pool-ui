import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useColorScheme, StyleSheet } from "react-native";
import { DrawerActions, useNavigation , DarkTheme, DefaultTheme } from "@react-navigation/native";
import DrawerNavigator from "./drawerNavigator";
import CarPool from "../screens/carPool/_layout";
import About from "../screens/about";
import Announcements from "../screens/announcements";
import Settings from "../screens/settings";
import Profile from "../screens/profile";
import CarOwnerNewPost from "../screens/carPool/newPost/carOwnerNewPost";
import RiderNewPost from "../screens/carPool/newPost/riderNewPost";
import { IconButton } from "react-native-paper";
import { ThemeType } from "../common/models/themeType";


const Drawer = createDrawerNavigator();
const StackNavigator = createNativeStackNavigator();
const TabNavigator = createMaterialTopTabNavigator();

const HtmlGrayColors = {
  dimGray: "rgb(105,105,105)",
  gray: "rgb(128,128,128)",
  darkGray: "rgb(169,169,169)",
  lightGray: "rgb(211,211,211)",
};

function NewPostsTabs() {
  return (
    <TabNavigator.Navigator>
      <TabNavigator.Screen
        name="I am Car Owner"
        component={CarOwnerNewPost}
        key={"CarOwnerTab"}
      />
      <TabNavigator.Screen
        name="I am Rider"
        component={RiderNewPost}
        key={"RiderTab"}
      />
    </TabNavigator.Navigator>
  );
}

function PoolingStack() {
  const navigation = useNavigation();
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        key={"CarPoolHome"}
        name="Car Pool"
        component={CarPool}
        options={{
          headerShown: true,
          headerLeft: () => (
            <IconButton
              icon="menu"
              style={styles.stackHeaderIconStyle}
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}
              size={25}
            />
          ),
        }}
      />
      <StackNavigator.Screen
        name="New Post"
        component={NewPostsTabs}
        key={"NewPostsTabs"}
      />
    </StackNavigator.Navigator>
  );
}

// RootNavigator should NOT include NavigationContainer if using Expo Router
function RootNavigator() {

  // TODO - pick last saved theme value or from user's preferences
  const systemTheme = useColorScheme() ?? "light";
  const [themeValueForSettingsScreen, setThemeValueForSettingsScreen] =
    useState<ThemeType>(systemTheme);
  const [currentTheme, setCurrentTheme] =
    useState<Exclude<ThemeType, "system">>(systemTheme);

  const updateTheme = (newTheme: ThemeType) => {
    const selectedTheme = newTheme === "system" ? systemTheme : newTheme;
    setCurrentTheme(selectedTheme);
    setThemeValueForSettingsScreen(newTheme);
  };

  const currentThemeColors =
    currentTheme === "dark"
      ? {
          dark: DarkTheme.dark,
          fonts: DarkTheme.fonts,
          colors: {
            ...DarkTheme.colors,
            ...HtmlGrayColors,
            themedGray: HtmlGrayColors.dimGray,
            white: "rgb(255,255,255)",
          },
        }
      : {
          dark: DefaultTheme.dark,
          fonts: DarkTheme.fonts,
          colors: {
            ...DefaultTheme.colors,
            ...HtmlGrayColors,
            themedGray: HtmlGrayColors.lightGray,
            white: "rgb(255,255,255)",
          },
        };

  return (
    <Drawer.Navigator
      drawerContent={DrawerNavigator}
      initialRouteName="PoolingScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: currentThemeColors.colors.themedGray,
        },
      }}
    >
      <Drawer.Screen
        name="PoolingScreen"
        component={PoolingStack}
        options={{ headerShown: false }}
      />
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
  );
}

export default RootNavigator;

const styles = StyleSheet.create({ stackHeaderIconStyle: { right: 20 } });
