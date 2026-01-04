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
  const calculatedContainerStyle: StyleProp<ViewStyle> = {
    ...styles.container,
    flexDirection: mode === "inline" ? "row" : "column",
  };

  const calculatedLabelStyle = {
    ...styles.label,
    marginBottom: mode === "inline" ? 0 : 10,
  };

  return (
    <View style={calculatedContainerStyle}>
      <Text style={calculatedLabelStyle}>{label}</Text>
      <ChoiceButtons {...rest} style={styles.buttons} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexShrink: 2,
  },
  container: {
    alignItems: "flex-start",
    display: "flex",
    marginBottom: 20,
    marginTop: 20,
  },
  label: {
    width: "auto",
  },
});

export default LabeledChoiceButtons;
