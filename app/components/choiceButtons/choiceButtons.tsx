import React from "react";
import SingleSelect from "./singleSelect";
import MultiSelect from "./multiSelect";
import { Props } from "react-native-paper/lib/typescript/src/components/SegmentedButtons/SegmentedButtons";

export type ChoiceButtonsProps = Props;

const ChoiceButtons: React.FunctionComponent<ChoiceButtonsProps> = ({
  value,
  multiSelect,
  onValueChange,
  ...otherProps
}) => {
  return (
    <>
      {multiSelect ? (
        <MultiSelect
          multiSelect={true}
          value={value as string[]}
          onValueChange={onValueChange as (value: string[]) => void}
          {...otherProps}
        />
      ) : (
        <SingleSelect
          multiSelect={false}
          value={value as string}
          onValueChange={onValueChange as (value: string) => void}
          {...otherProps}
        />
      )}
    </>
  );
};

export default ChoiceButtons;
