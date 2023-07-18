import React from 'react';
import { Image } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
  DrawerNavigationOptions
//   DrawerContentOptions,
} from '@react-navigation/drawer';
// import { Text, Divider, Switch, useTheme } from '@rneui/themed';
import { Text, View } from '@/app/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { APP_NAME } from '@/config';
// import { useTheme } from '@react-navigation/native';

function CustomContentComponent(
  props: DrawerContentComponentProps
) {
//   const { updateTheme, theme } = useTheme();
  // const colorScheme = useColorScheme();

  // React.useEffect(() => {
  //   updateTheme({ mode: colorScheme === 'dark' ? 'dark' : 'light' });
  // }, [colorScheme, updateTheme]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: '100%',
        // backgroundColor: theme?.colors?.grey5,
      }}
      edges={['right', 'left', 'bottom']}
    >
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            marginTop: 3,
          }}
        >
          {APP_NAME}
        </Text>
        
        {/* <Image
          source={require('../images/logo.png')}
          style={{ width: '70%', height: 100, tintColor: '#397af8' }}
          resizeMode="contain"
        /> */}
      </View>

      {/* <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          paddingLeft: 25,
          paddingBottom: 5,
        }}
      >
        <Text
          style={{
            marginTop: 3,
          }}
        >
          Dark Mode
        </Text>

        { <Switch
          style={{
            position: 'absolute',
            right: 5,
          }}
          value={theme.mode === 'dark'}
          onValueChange={() => {
            updateTheme((myTheme) => ({
              mode: myTheme.mode === 'dark' ? 'light' : 'dark',
            }));
          }}
        /> }
      </View> */}
      {/* <Divider style={{ marginTop: 15 }} /> */}
      <View style={{ marginLeft: 10, width: '100%' }}>
        <DrawerItemList {...props} />
      </View>
    </SafeAreaView>
  );
}

function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  return (
    <DrawerContentScrollView {...props}>
      <CustomContentComponent {...props} />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;