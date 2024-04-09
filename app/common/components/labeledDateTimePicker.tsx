import React, { FC, useState } from "react";
import DateTimePicker, {
  AndroidNativeProps,
  DateTimePickerEvent,
  IOSNativeProps,
} from "@react-native-community/datetimepicker";
import { ButtonIcon, View, Text } from "./themed";
import { StyleSheet } from "react-native";
import { LocalTime } from "../models/types";

type LabeledDateTimePropsType = {
  mode: "date" | "time";
  label?: string;
  labelLaunchButton: LocalTime | string;
  onChange: (event: DateTimePickerEvent, date?: Date) => void;
} & (IOSNativeProps | AndroidNativeProps);
// } & FC<Omit<IOSNativeProps | AndroidNativeProps, "mode">>;
// Omit<IOSNativeProps, "mode">;

const LabeledDateTimePicker = function ({
  mode,
  onChange,
  value,
  label,
  labelLaunchButton,
  ...rest
}: LabeledDateTimePropsType) {
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  const labelForLaunchButton =
    typeof labelLaunchButton === "string"
      ? labelLaunchButton
      : labelLaunchButton.value;

  return (
    <View style={styles.container}>
      {label && <Text>{label}</Text>}
      {!showDateTimePicker && (
        <ButtonIcon
          onPress={() => {
            setShowDateTimePicker(true);
          }}
          icon={"clock-time-four"}
        >
          {labelForLaunchButton}
        </ButtonIcon>
      )}
      {showDateTimePicker && (
        <DateTimePicker
          mode={mode}
          onChange={(e, d) => {
            setShowDateTimePicker(false);
            onChange(e, d);
          }}
          value={value}
          {...rest}
          // is24Hour
        />
      )}
    </View>
  );
};

export default LabeledDateTimePicker;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
});
