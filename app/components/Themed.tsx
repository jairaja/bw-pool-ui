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
import React from "react";
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
  const { color, ...otherProps } = props;
  const themeColor = useThemeColor("text");
  return <DefaultButton color={themeColor} {...otherProps} />;
}
