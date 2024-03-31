import React from "react";
import ChoiceButtons, {
  ChoiceButtonsProps,
} from "./choiceButtons/choiceButtons";
import { View, Text } from "./themed";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

type TextWithChoiceButtonsPropsType = {
  label: string;
  mode?: "inline" | "block";
} & ChoiceButtonsProps;

const TextWithChoiceButtons = ({
  label,
  mode = "block",
  ...rest
}: TextWithChoiceButtonsPropsType) => {
  const calculatedStyle: StyleProp<ViewStyle> = {
    ...styles.filters,
    flexDirection: mode === "inline" ? "row" : "column",
  };

  return (
    <View style={calculatedStyle}>
      <Text>{label}</Text>
      <ChoiceButtons {...rest} />
    </View>
  );
};

const styles = StyleSheet.create({
  filters: {
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    width: "auto",
  },
});

export default TextWithChoiceButtons;
