/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  Switch as DefaultSwitch,
  Button as DefaultButton,
} from "react-native";
import { Button as DefaultButtonIcon } from "react-native-paper";
// import { Button as DefaultButtonIcon, TextInput as DefaultTextInput } from "react-native-paper";
import React from "react";
import { Props as RNPButtonProps } from "react-native-paper/lib/typescript/src/components/Button/Button";
// import { Props as RNPTextInputProps } from "react-native-paper/lib/typescript/src/components/TextInput/TextInput";
import { useThemeColor } from "../utils/themeHelper";

// export type TextProps = ThemeProps & DefaultText["props"];

export function Text(props: DefaultText["props"]) {
  const { style, ...otherProps } = props;
  const color = useThemeColor("text");
  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: DefaultView["props"]) {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor("background");

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Switch(props: DefaultSwitch["props"]) {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor("background");

  return <DefaultSwitch style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Button(props: DefaultButton["props"]) {
  const textThemeColor = useThemeColor("text");
  return <DefaultButton {...props} color={textThemeColor} />;
}

export function ButtonIcon(props: RNPButtonProps) {
  const textThemeColor = useThemeColor("text");
  return <DefaultButtonIcon {...props} textColor={textThemeColor} />;
}

// export function TextInput(props: RNPTextInputProps) {
//   const textThemeColor = useThemeColor("text");
//   return <DefaultTextInput {...props} contentStyle />;
// }
