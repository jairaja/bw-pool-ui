/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  Switch as DefaultSwitch,
  Button as DefaultButton,
  StyleSheet,
} from "react-native";
import {
  Button as DefaultButtonIcon,
  TextInput as DefaultTextInput,
} from "react-native-paper";
import React from "react";
import { Props as RNPButtonProps } from "react-native-paper/lib/typescript/src/components/Button/Button";
import { Props as RNPTextInputProps } from "react-native-paper/lib/typescript/src/components/TextInput/TextInput";
import { useThemeColor } from "../utils/themeHelper";
import DefaultSlider, { SliderProps } from "@react-native-community/slider";

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

export function Switch({ style, ...otherProps }: DefaultSwitch["props"]) {
  const backgroundColor = useThemeColor("background");
  const thumbColor = useThemeColor("themedGray");
  const offColor = useThemeColor("gray");
  const borderColor = useThemeColor("border");
  const onColor = useThemeColor("white");

  return (
    <DefaultSwitch
      style={[{ backgroundColor, borderColor: borderColor }, style]}
      thumbColor={thumbColor}
      trackColor={{ false: offColor, true: onColor }}
      {...otherProps}
    />
  );
}

export function Slider({ style, ...otherProps }: SliderProps) {
  const thumbColor = useThemeColor("themedGray");
  const minTrackColor = useThemeColor("gray");
  const maxTrackColor = useThemeColor("text");

  return (
    <DefaultSlider
      style={[styles.slider, style]}
      thumbTintColor={thumbColor}
      minimumTrackTintColor={minTrackColor}
      maximumTrackTintColor={maxTrackColor}
      {...otherProps}
    />
  );
}

export function Button(props: DefaultButton["props"]) {
  const textThemeColor = useThemeColor("text");
  return <DefaultButton {...props} color={textThemeColor} />;
}

export function ButtonIcon({ style, disabled, ...props }: RNPButtonProps) {
  const textThemeColor = useThemeColor("text");
  const backgroundColor = useThemeColor("themedGray");
  const calculatedStyle = disabled ? [{ backgroundColor }, style] : style;
  return (
    <DefaultButtonIcon
      style={calculatedStyle}
      disabled={disabled}
      mode="outlined"
      textColor={textThemeColor}
      {...props}
    />
  );
}

export function TextInput(props: RNPTextInputProps) {
  const textThemeColor = useThemeColor("text");
  const outlineColor = useThemeColor("themedGray");
  return (
    <DefaultTextInput
      numberOfLines={2}
      maxLength={100}
      mode="outlined"
      textColor={textThemeColor}
      activeOutlineColor={outlineColor}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  slider: {
    height: 25,
    // transform: IsIOS
    //   ? [{ scaleY: 1 }, { scaleX: 1 }]
    //   : [{ scaleY: 2 }, { scaleX: 2 }],
    width: "40%",
  },
});
