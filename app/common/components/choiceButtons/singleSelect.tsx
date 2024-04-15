import React from "react";
import { ChoiceButtonsProps } from "./choiceButtons";
import { SegmentedButtons } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

type SingleSelectTypes = ChoiceButtonsProps & {
  multiSelect?: false;
  onValueChange: (value: string | undefined) => void;
};

const SingleSelect: React.FunctionComponent<SingleSelectTypes> = ({
  buttons,
  value,
  disabled,
  nullable,
  onValueChange,
  ...rest
}) => {
  const onValueUpdate = function (newValue: string) {
    const calculatedNewValue =
      nullable && newValue === value ? undefined : newValue;
    onValueChange(calculatedNewValue);
  };

  const { colors } = useTheme();
  const styledButtons = buttons.map((button) => {
    return {
      ...button,
      uncheckedColor: button.uncheckedColor ?? colors.text,
      checkedColor: button.checkedColor ?? colors.background,
      disabled: disabled,
    };
  });

  return (
    <SegmentedButtons
      buttons={styledButtons}
      value={value}
      onValueChange={onValueUpdate}
      {...rest}
    />
  );
};

export default SingleSelect;
