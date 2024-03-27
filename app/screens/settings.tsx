import { View, Text } from "@/app/components/Themed";
import React from "react";
import ChoiceButtons from "../components/ChoiceButtons";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeType } from "../models/themeType";

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
      style={{
        flex: 1,
        height: "100%",
      }}
      edges={["right", "left", "bottom"]}
    >
      <View style={styles.view}>
        <Text style={styles.text}>Theme : </Text>
        <ChoiceButtons
          density="small"
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
  view: {
    margin: 10,
  },
  text: {
    textAlign: "left",
    padding: 5,
    marginBottom: 5,
  },
  more: {
    marginVertical: 20,
  },
  button: {
    width: 120,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default Settings;
