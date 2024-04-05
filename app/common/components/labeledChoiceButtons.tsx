import React from "react";
import ChoiceButtons, {
  ChoiceButtonsProps,
} from "./choiceButtons/choiceButtons";
import { View, Text } from "./themed";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

type LabeledChoiceButtonsPropsType = {
  label: string;
  mode?: "inline" | "block";
} & ChoiceButtonsProps;

const LabeledChoiceButtons = ({
  label,
  mode = "block",
  ...rest
}: LabeledChoiceButtonsPropsType) => {
  const calculatedStyle: StyleProp<ViewStyle> = {
    ...styles.filters,
    flexDirection: mode === "inline" ? "row" : "column",
  };

  return (
    <View style={calculatedStyle}>
      <Text style={styles.text}>{label}</Text>
      <ChoiceButtons {...rest} style={styles.buttons} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexShrink: 2,
  },
  filters: {
    alignItems: "center",
    display: "flex",
  },
  text: {
    width: "auto",
  },
});

export default LabeledChoiceButtons;
