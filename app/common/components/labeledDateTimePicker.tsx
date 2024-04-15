import React, { useState } from "react";
import DateTimePicker, {
  AndroidNativeProps,
  DateTimePickerEvent,
  IOSNativeProps,
} from "@react-native-community/datetimepicker";
import { ButtonIcon, View, Text } from "./themed";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

type LabeledDateTimePropsType = {
  mode: "date" | "time";
  label?: string;
  labelLaunchButton: string;
  disabled?: boolean;
  resetTime?: () => void;
  onChange: (event: DateTimePickerEvent, date?: Date) => void;
} & (IOSNativeProps | AndroidNativeProps);

const LabeledDateTimePicker = function ({
  mode,
  onChange,
  value,
  label,
  labelLaunchButton,
  disabled,
  resetTime,
  ...rest
}: LabeledDateTimePropsType) {
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text>{label}</Text>}
      {!showDateTimePicker && (
        <ButtonIcon
          onPress={() => {
            setShowDateTimePicker(true);
          }}
          icon={"clock-time-four"}
          disabled={disabled}
        >
          {labelLaunchButton}
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
      {!showDateTimePicker && (
        <IconButton
          icon="backup-restore"
          disabled={disabled}
          size={15}
          style={styles.resetButton}
          onPress={resetTime}
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
    marginBottom: 10,
    marginTop: 10,
  },
  resetButton: { alignSelf: "auto" },
});
