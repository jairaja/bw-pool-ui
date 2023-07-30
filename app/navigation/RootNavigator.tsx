import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { useTheme } from '@rneui/themed';
import DrawerNavigator from './DrawerNavigator';
import Pooling from '../screens/pooling';
import About from '../screens/about';
import Announcements from '../screens/announcements';
import Settings from '../screens/settings';
import Profile from '../screens/profile';

const Drawer = createDrawerNavigator();

function RootNavigator() {
//   const { theme } = useTheme();

  return (
    <NavigationContainer independent
    //   theme={{
    //     colors: {
    //       background: theme?.colors.background,
    //       primary: '',
    //       card: '',
    //       text: '',
    //       border: '',
    //       notification: '',
    //     },
    //     dark: theme.mode === 'dark',
    //   }}
    >
      <Drawer.Navigator
        drawerContent={DrawerNavigator}

        // drawerContentOptions={{
        //   activeTintColor: theme?.colors?.secondary,
        //   activeBackgroundColor: 'transparent',
        //   inactiveTintColor: theme?.colors?.grey0,
        //   inactiveBackgroundColor: 'transparent',
        //   labelStyle: {
        //     fontSize: 15,
        //     marginLeft: 0,
        //   },
        // }}
        // drawerStyle={{
        //   backgroundColor: theme?.colors?.grey4,
        // }}
      >
        <Drawer.Screen name="Pooling" component={Pooling} />
        <Drawer.Screen name="Announcements" component={Announcements} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="About" component={About} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;