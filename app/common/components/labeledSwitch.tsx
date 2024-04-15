import React from "react";
import { Switch, Text, View } from "./themed";
import { SwitchProps, StyleSheet } from "react-native";

type LabeledSwitchPropsType = {
  label: string;
} & SwitchProps;

const LabeledSwitch = function ({ label, ...rest }: LabeledSwitchPropsType) {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <Switch {...rest} />
    </View>
  );
};

export default LabeledSwitch;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    marginTop: 5,
  },
});
