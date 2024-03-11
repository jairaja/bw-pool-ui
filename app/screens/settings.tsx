import { View, Text } from "@/app/components/Themed";
import React, { useState } from "react";
import ChoiceButtons from "../components/ChoiceButtons";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SettingsProps = {};
const Settings: React.FunctionComponent<SettingsProps> = () => {
  const [theme, setTheme] = useState("lightTheme");

  const onThemeChanged = (value: string | string[]) => {
    console.log(value);
    if (!Array.isArray(value)) {
      setTheme(value);
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
          value={theme}
          onValueChange={onThemeChanged}
          buttons={[
            {
              value: "lightTheme",
              label: "Light",
              showSelectedCheck: true,
            },
            {
              value: "darkTheme",
              label: "Dark",
              showSelectedCheck: true,
            },
            {
              value: "systemTheme",
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
