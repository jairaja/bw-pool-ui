import { useTheme } from "@react-navigation/native";
import { ThemeColorsType } from "../models/themeType";

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
