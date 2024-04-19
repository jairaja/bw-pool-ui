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
  Divider as DefaultDivider,
} from "react-native-paper";
import React, { useEffect, useState } from "react";
import { Props as RNPButtonProps } from "react-native-paper/lib/typescript/src/components/Button/Button";
import { Props as RNPTextInputProps } from "react-native-paper/lib/typescript/src/components/TextInput/TextInput";
import { Props as RNPDividerProps } from "react-native-paper/lib/typescript/src/components/Divider";
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

export function Switch({
  style,
  disabled,
  ...otherProps
}: DefaultSwitch["props"]) {
  const backgroundColor = useThemeColor("background");
  const thumbColor = useThemeColor("themedGray");
  const offColor = disabled ? thumbColor : useThemeColor("gray");
  const borderColor = useThemeColor("border");
  const onColor = useThemeColor("white");

  return (
    <DefaultSwitch
      style={[{ backgroundColor, borderColor: borderColor }, style]}
      thumbColor={thumbColor}
      disabled={disabled}
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

export function TextInput({
  value,
  label,
  maxLength,
  ...rest
}: RNPTextInputProps) {
  const textThemeColor = useThemeColor("text");
  const outlineColor = useThemeColor("themedGray");
  const calculatedMaxLength = maxLength ?? 100;
  const [calculatedLabel, setCalculatedLabel] = useState(label);
  useEffect(
    function () {
      let numberOfChars = 0;
      if (value) {
        numberOfChars = value.length;
      }
      setCalculatedLabel(
        `${label} (${numberOfChars}/${calculatedMaxLength} chars)`
      );
    },
    [value]
  );
  return (
    <DefaultTextInput
      numberOfLines={2}
      maxLength={calculatedMaxLength}
      mode="outlined"
      textColor={textThemeColor}
      activeOutlineColor={outlineColor}
      value={value ?? ""}
      label={calculatedLabel}
      {...rest}
    />
  );
}

export function Divider({ style, ...rest }: RNPDividerProps) {
  const calculatedStyle = [style, styles.divider];
  return <DefaultDivider style={calculatedStyle} {...rest} />;
}

const styles = StyleSheet.create({
  divider: {
    marginBottom: 10,
    marginTop: 10,
  },
  slider: {
    height: 25,
    // transform: IsIOS
    //   ? [{ scaleY: 1 }, { scaleX: 1 }]
    //   : [{ scaleY: 2 }, { scaleX: 2 }],
    width: "40%",
  },
});
