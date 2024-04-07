import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
  DrawerNavigationOptions,
  //   DrawerContentOptions,
} from "@react-navigation/drawer";
import { Text , View} from "@/app/common/components/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { APP_NAME, APP_NAME_Slogan } from "@/config";

function CustomContentComponent(props: DrawerContentComponentProps) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: "100%",
        // backgroundColor: theme?.colors?.grey5,
      }}
      edges={["right", "left", "bottom"]}
    >
      <View
        style={{
          display: "flex",
          marginTop: 10,
          marginBottom: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", marginTop: 3 }}>{APP_NAME}</Text>
        <Text style={{ fontStyle:"italic", fontSize:12, marginTop: 3 }}>{APP_NAME_Slogan}</Text>
      </View>

      {/* <View style={{ marginLeft: 10, width: "100%", }}> */}
      <DrawerItemList {...props} />
      {/* </View> */}
    </SafeAreaView>
  );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <CustomContentComponent {...props} />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
