import { View, Text } from "@/app/components/themed";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeType } from "../models/themeType";
import SingleSelect from "../components/choiceButtons/singleSelect";
// import { IsIOS } from "../utils/helpers";
// import { generateBoxShadowStyle } from "../utils/themeHelper";
import { Card, Button } from "react-native-paper";

type SettingsPropsType = {
  currentTheme: ThemeType;
  updateTheme: (theme: ThemeType) => void;
};
const Settings: React.FunctionComponent<SettingsPropsType> = (
  SettingsProps
) => {
  const onThemeChanged = (value: string | string[]) => {
    if (!Array.isArray(value)) {
      SettingsProps.updateTheme(value as ThemeType);
    }
  };

  // const boxShadowStyle = IsIOS ? styles.shadowProp: styles.elevation

  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: "100%",
      }}
      edges={["right", "left", "bottom"]}
    >
      <View style={styles.view}>
        <Text style={styles.text}>Theme : </Text>
        <SingleSelect
          density="high"
          value={SettingsProps.currentTheme}
          onValueChange={onThemeChanged}
          buttons={[
            {
              value: "light",
              label: "Light",
              showSelectedCheck: true,
            },
            {
              value: "dark",
              label: "Dark",
              showSelectedCheck: true,
            },
            {
              value: "system",
              label: "System",
              showSelectedCheck: true,
            },
          ]}
        />

        {/* <View style={{...boxShadowStyle, ...styles.card}}> */}
        {/* <View style={generateBoxShadowStyle(0, 2, 0.23, 2.62, 4, "#fff")}>
          <Text>Surface</Text>
        </View> */}

        <Card>
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 120,
  },
  card: {
    // backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 25,
    paddingVertical: 45,
    width: "100%",
  },
  elevation: {
    elevation: 20,
    shadowColor: "#52006A",
  },
  more: {
    marginVertical: 20,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  surface: {
    alignItems: "center",
    backgroundColor: "green",
    height: 80,
    justifyContent: "center",
    padding: 8,
    width: 80,
    // elevation: 4,
    // boxShadow:
  },
  text: {
    marginBottom: 5,
    padding: 5,
    textAlign: "left",
  },
  view: {
    margin: 10,
  },
});

export default Settings;
