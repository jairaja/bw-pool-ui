import React from "react";
import { GestureResponderEvent } from "react-native";
import SingleSelect from "./singleSelect";
import MultiSelect from "./multiSelect";

type ButtonForChoiceButtons = {
  value: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  checkedColor?: string;
  uncheckedColor?: string;
  onPress?: (event: GestureResponderEvent) => void;
  showSelectedCheck?: boolean;
};

export type ChoiceButtonsProps = {
  isMultiSelect?: boolean;
  density?: "regular" | "small" | "medium" | "high";
  buttons: ButtonForChoiceButtons[];
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
};

const ChoiceButtons: React.FunctionComponent<ChoiceButtonsProps> = ({
  value,
  isMultiSelect,
  ...otherProps
}) => {
  return (
    <>
      {isMultiSelect ? (
        <MultiSelect value={value as string[]} {...otherProps} />
      ) : (
        <SingleSelect value={value as string} {...otherProps} />
      )}
    </>
  );
};

export default ChoiceButtons;
