import React, { useState } from "react";
import {
  NavigationContainer,
  DarkTheme,
  useNavigation,
  DefaultTheme,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerNavigator from "./drawerNavigator";
import { DrawerActions } from "@react-navigation/native";
import CarPool from "../screens/carPool/_layout";
import About from "../screens/about";
import Announcements from "../screens/announcements";
import Settings from "../screens/settings";
import Profile from "../screens/profile";
import { useColorScheme, StyleSheet } from "react-native";
import { ThemeType } from "../common/models/themeType";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CarOwnerNewPost from "../screens/carPool/newPost/carOwnerNewPost";
import RiderNewPost from "../screens/carPool/newPost/riderNewPost";
import { IconButton } from "react-native-paper";

const Drawer = createDrawerNavigator();
const StackNavigator = createNativeStackNavigator();
const TabNavigator = createMaterialTopTabNavigator();

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

  const currentThemeColors =
    currentTheme === "dark"
      ? {
          dark: DarkTheme.dark,
          colors: {
            ...DarkTheme.colors,
            ...HtmlGrayColors,
            themedGray: HtmlGrayColors.dimGray,
            white: "rgb(255,255,255)",
          },
        }
      : {
          dark: DefaultTheme.dark,
          colors: {
            ...DefaultTheme.colors,
            ...HtmlGrayColors,
            themedGray: HtmlGrayColors.lightGray,
            white: "rgb(255,255,255)",
          },
        };

  function NewPostsTabs() {
    return (
      <TabNavigator.Navigator>
        <TabNavigator.Screen
          name="I am Car Owner"
          component={CarOwnerNewPost}
        />
        <TabNavigator.Screen name="I am Rider" component={RiderNewPost} />
      </TabNavigator.Navigator>
    );
  }

  // function PoolingStack({navigation}) {
  function PoolingStack() {
    const navigation = useNavigation();
    return (
      <StackNavigator.Navigator>
        <StackNavigator.Screen
          name="Car Pool"
          component={CarPool}
          options={{
            headerShown: true,
            headerLeft: () => {
              return (
                <IconButton
                  icon="menu"
                  style={styles.stackHeaderIconStyle}
                  onPress={() => {
                    navigation.dispatch(DrawerActions.openDrawer());
                  }}
                  size={25}
                />
              );
            },
          }}
        />
        <StackNavigator.Screen name="New Post" component={NewPostsTabs} />
      </StackNavigator.Navigator>
    );
  }

  return (
    <NavigationContainer independent theme={currentThemeColors}>
      <Drawer.Navigator
        drawerContent={DrawerNavigator}
        initialRouteName="PoolingScreen"
        // backBehavior="history"
        screenOptions={{
          headerStyle: {
            backgroundColor: currentThemeColors.colors.themedGray,
            // elevation: 4, // shadow
            // shadowOffset
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
    </NavigationContainer>
  );
}

export default RootNavigator;

const styles = StyleSheet.create({ stackHeaderIconStyle: { right: 20 } });
