import { useTheme } from "@react-navigation/native";
import { ThemeColorsType } from "../models/themeType";
// import { IsAndroid, IsIOS } from "./helpers";

export function useThemeColor(colorName: keyof ThemeColorsType["colors"]) {
  const { colors } = useTheme() as ThemeColorsType;
  return colors[colorName];
}

export function themePrimaryColorOverridden(
  colorName: keyof ThemeColorsType["colors"]
) {
  const currentTheme = useTheme();
  return {
    ...currentTheme,
    colors: { ...currentTheme.colors, primary: useThemeColor(colorName) },
  };
}

export const generateBoxShadowStyle = (
  xOffset: number,
  yOffset: number,
  // shadowColorIos: string,
  shadowOpacity: number,
  shadowRadius: number,
  elevation: number,
  // shadowColorAndroid: string
  shadowColor: string
) => {
  // if (IsIOS) {
  //   return {
  //     shadowColor: shadowColorIos,
  //     shadowOffset: { width: xOffset, height: yOffset },
  //     shadowOpacity,
  //     shadowRadius,
  //   };
  // } else if (IsAndroid) {
  //   return {
  //     elevation,
  //     shadowColor: shadowColorAndroid,
  //   };
  // }

  return {
    shadowColor,
    shadowOffset: {
      width: xOffset,
      height: yOffset,
    },
    shadowOpacity,
    shadowRadius,

    elevation,
  };
};

// example generateBoxShadowStyle(-2, 4, "#171717", 0.2, 3, 4, "#171717");
