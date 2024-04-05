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
import Pooling from "../screens/pooling/_layout";
import About from "../screens/about";
import Announcements from "../screens/announcements";
import Settings from "../screens/settings";
import Profile from "../screens/profile";
import { useColorScheme } from "react-native";
import { ThemeType } from "../common/models/themeType";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewPost from "../screens/pooling/newPost/_layout";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CarOwnerNewPost from "../screens/pooling/newPost/carOwnerNewPost";
import RiderNewPost from "../screens/pooling/newPost/riderNewPost";
import { Button as ButtonWithIcon } from "react-native-paper";
import { useThemeColor } from "../utils/themeHelper";

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
          name="Pooling"
          component={Pooling}
          options={{
            headerShown: true,
            headerLeft: () => {
              return (
                <ButtonWithIcon
                  icon="filter-variant"
                  onTouchStart={() => {
                    navigation.dispatch(DrawerActions.openDrawer());
                  }}
                  textColor={useThemeColor("text")}
                  // theme={themePrimaryColorOverridden("text")}
                >
                  {" "}
                </ButtonWithIcon>
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
