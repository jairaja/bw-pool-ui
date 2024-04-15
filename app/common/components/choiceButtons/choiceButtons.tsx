import React from "react";
import SingleSelect from "./singleSelect";
import MultiSelect from "./multiSelect";
import { Props as SegmentedButtonsProps } from "react-native-paper/lib/typescript/src/components/SegmentedButtons/SegmentedButtons";

export type ChoiceButtonsProps = {
  value: string | string[];
  nullable?: boolean;
  disabled?:boolean;
} & SegmentedButtonsProps;

const ChoiceButtons: React.FunctionComponent<ChoiceButtonsProps> = ({
  value,
  nullable,
  multiSelect,
  onValueChange,
  ...otherProps
}: ChoiceButtonsProps) => {
  return (
    <>
      {multiSelect ? (
        <MultiSelect
          multiSelect
          value={value as string[]}
          onValueChange={onValueChange as (value: string[]) => void}
          {...otherProps}
        />
      ) : (
        <SingleSelect
          nullable={nullable}
          multiSelect={false}
          value={value as string}
          onValueChange={onValueChange as (value: string | undefined) => void}
          {...otherProps}
        />
      )}
    </>
  );
};

export type ChildButtonProps = {
  value: string;
  label: string;
  showSelectedCheck: boolean;
};

export function GetChildButtons(buttons: string[]): ChildButtonProps[] {
  return buttons.map((button) => ({
    value: button,
    label: button,
    showSelectedCheck: true,
  }));
}

export default ChoiceButtons;
