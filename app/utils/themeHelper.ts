import { useTheme } from "@react-navigation/native";
import { ThemeColorsType } from "../models/themeType";
import { IsAndroid, IsIOS } from "./helpers";

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

export type BoxShadowStyleType= { xOffset?: number;
  shadowColor?: string;
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;}

export const generateBoxShadowStyle = ({
  xOffset=-2,
  shadowColor="#171717",
  shadowOpacity=0.2,
  shadowRadius=3,
  elevation=4,
}:BoxShadowStyleType) => {

  const themedShadowColor = useTheme().dark?"#fff":shadowColor;

  if (IsIOS) {
    return {
      shadowColor:themedShadowColor,
      shadowOffset: { width: xOffset, height: elevation },
      shadowOpacity,
      shadowRadius,
    };
  } else if (IsAndroid) {
    return {
      elevation,
      shadowColor:themedShadowColor,
    };
  }
};
