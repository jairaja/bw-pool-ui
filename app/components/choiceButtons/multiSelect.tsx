import React from "react";
import { ChoiceButtonsProps } from "./choiceButtons";
import { SegmentedButtons } from "react-native-paper";
import { useTheme } from "@react-navigation/native";


type MultiSelectTypes = Omit<
  ChoiceButtonsProps,
  "isMultiSelect" | "onValueChange" | "value"
> & {
  onValueChange: (value: string[]) => void;
  value: string[];
};

const MultiSelect: React.FunctionComponent<MultiSelectTypes> = ({
  density,
  value,
  onValueChange,
  buttons,
}) => {
  const { colors } = useTheme();

  const [multiSelectValue, setMultiSelectValue] =
    React.useState<string[]>(value);

  React.useEffect(() => setMultiSelectValue(value), [value]);

  const styledButtons = buttons.map((button) => {
    return { ...button, uncheckedColor: button.uncheckedColor ?? colors.text };
  });

  return (
    <SegmentedButtons
      multiSelect
      value={multiSelectValue}
      onValueChange={onValueChange}
      density={density ?? "regular"}
      buttons={styledButtons}
    />
  );
};

export default MultiSelect;
