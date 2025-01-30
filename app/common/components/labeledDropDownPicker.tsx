import React from "react";
import { View, Text } from "./themed";
import { StyleSheet } from "react-native";
import DropDownPicker, {
  DropDownPickerProps,
  ValueType,
} from "react-native-dropdown-picker";
import { useTheme } from "@react-navigation/native";

type LabeledDropDownPickerPropsType = {
  label: string;
} & DropDownPickerProps<ValueType>;

const LabeledDropDownPicker = function ({
  label,
  searchable = true,
  ...rest
}: LabeledDropDownPickerPropsType) {
  const currentTheme = useTheme().dark ? "DARK" : "LIGHT";

  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <DropDownPicker
        theme={currentTheme}
        searchPlaceholder="Search..."
        listMode="MODAL"
        modalProps={{
          animationType: "slide",
        }}
        {...rest}
        searchable={searchable}
      />
    </View>
  );
};

export default LabeledDropDownPicker;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 5,
    width: "75%",
  },
});
