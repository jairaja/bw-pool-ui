import React from "react";
import { Switch, Text, View } from "./themed";
import { SwitchProps, StyleSheet } from "react-native";

type LabeledSwitchPropsType = {
  label: string;
} & SwitchProps;

const LabeledSwitch = function ({ label, ...rest }: LabeledSwitchPropsType) {
  return (
    <View style={styles.container}>
      <View style={styles.labelCell}>
        <Text>{label}</Text>
      </View>
      <View style={styles.switchCell}>
        <Switch {...rest} />
      </View>
    </View>
  );
};

export default LabeledSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 20,
  },
  labelCell: {
    alignItems: "flex-start",
    flex: 1,
    justifyContent: "center",
  },
  switchCell: {
    alignItems: "flex-start",
    flex: 1,
    justifyContent: "center",
  },
});
