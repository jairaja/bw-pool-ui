import React from "react";
import { ChoiceButtonsProps } from "./choiceButtons";
import { SegmentedButtons } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

type MultiSelectTypes = ChoiceButtonsProps & { multiSelect: true };

const MultiSelect: React.FunctionComponent<MultiSelectTypes> = ({
  buttons,
  ...rest
}:MultiSelectTypes) => {
  const { colors } = useTheme();
  const styledButtons = buttons.map((button) => {
    return {
      ...button,
      uncheckedColor: button.uncheckedColor ?? colors.text,
      checkedColor: button.checkedColor ?? colors.background,
    };
  });

  return <SegmentedButtons buttons={styledButtons} {...rest} multiSelect />;
};

export default MultiSelect;
