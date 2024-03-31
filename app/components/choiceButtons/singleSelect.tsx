import React from "react";
import { ChoiceButtonsProps } from "./choiceButtons";
import { SegmentedButtons } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

type SingleSelectTypes = ChoiceButtonsProps & {
  multiSelect?: false;
};

const SingleSelect: React.FunctionComponent<SingleSelectTypes> = ({
  buttons,
  ...rest
}) => {
  const { colors } = useTheme();
  const styledButtons = buttons.map((button) => {
    return {
      ...button,
      uncheckedColor: button.uncheckedColor ?? colors.text,
      checkedColor: button.checkedColor ?? colors.background,
    };
  });

  return <SegmentedButtons buttons={styledButtons} {...rest} />;
};

export default SingleSelect;
