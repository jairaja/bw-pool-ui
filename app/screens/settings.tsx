import { View, Text } from "@/app/components/themed";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeType } from "../models/themeType";
import SingleSelect from "../components/choiceButtons/singleSelect";

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

  return (
    <SafeAreaView
      style={styles.safeAreaContainer}
      edges={["right", "left", "bottom"]}
    >
      <View style={styles.view}>
        <Text style={styles.text}>Theme : </Text>
        <SingleSelect
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    height: "100%",
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
