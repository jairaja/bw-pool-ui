import { SliderProps } from "@react-native-community/slider";
import { Slider, Text, View } from "./themed";
import { StyleSheet } from "react-native";
import React from "react";

type LabeledSliderPropsType = {
  label: string;
  displayValue: string;
} & SliderProps;

// Slider is not a controlled component. Value will set bu sliding.
// Value can be updated programmetically, this wont fire onValueChange event.
export default function LabeledSlider({
  label,
  displayValue,
  ...rest
}: LabeledSliderPropsType) {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>

      <Slider
        {...rest}
      />
      <Text>{displayValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 10,
  },
});
