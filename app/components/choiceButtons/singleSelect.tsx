import React from "react";
import { ChoiceButtonsProps } from "./choiceButtons";
import { SegmentedButtons } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

type SingleSelectTypes = Omit<
  ChoiceButtonsProps,
  "isMultiSelect" | "onValueChange" | "value"
> & {
  onValueChange: (value: string) => void;
  value: string;
};

const SingleSelect: React.FunctionComponent<SingleSelectTypes> = ({
  density,
  value,
  onValueChange,
  buttons,
}) => {
  const{colors} = useTheme();
  const [singleSelectValue, setSingleSelectValue] =
    React.useState<string>(value);

  React.useEffect(() => setSingleSelectValue(value), [value]);

  const styledButtons = buttons.map(button=>{
    return { ...button, uncheckedColor:button.uncheckedColor ?? colors.text}
  })

  return (
    <SegmentedButtons
      multiSelect={false}
      value={singleSelectValue}
      onValueChange={(value: string) => onValueChange(value)}
      density={density ?? "regular"}
      buttons={styledButtons}
    />
  );
};

export default SingleSelect;
