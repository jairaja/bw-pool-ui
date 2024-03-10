import React from "react";
import { GestureResponderEvent } from "react-native";
import { SegmentedButtons } from "react-native-paper";

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

interface ChoiceButtonsProps {
  isMultiSelect?: boolean;
  density?: "regular" | "small" | "medium" | "high";
  buttons: ButtonForChoiceButtons[];
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
}

const ChoiceButtons = (props: ChoiceButtonsProps) => {
  const { buttons, isMultiSelect, density, value, onValueChange } = props;

  const setValueSingleSelect = (value: string) => onValueChange(value);

  const singleSelectChoiceButtons = (props: string) => {
    const [singleSelectValue, setSingleSelectValue] =
      React.useState<string>(props);

    React.useEffect(() => setSingleSelectValue(props), [props]);

    return (
      <SegmentedButtons
        multiSelect={false}
        value={singleSelectValue}
        onValueChange={setValueSingleSelect}
        density={density ?? "regular"}
        buttons={buttons}
      />
    );
  };

  const multiSelectChoiceButtons = (props: string[]) => {
    const [multiSelectValue, setMultiSelectValue] =
      React.useState<string[]>(props);

    React.useEffect(() => setMultiSelectValue(props), [props]);

    return (
      <SegmentedButtons
        multiSelect
        value={multiSelectValue}
        onValueChange={(values) => onValueChange(values)}
        density={density ?? "regular"}
        buttons={buttons}
      />
    );
  };

  return (
    <>
      {isMultiSelect
        ? multiSelectChoiceButtons(value as string[])
        : singleSelectChoiceButtons(value as string)}
    </>
  );
};

export default ChoiceButtons;
