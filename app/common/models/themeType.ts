export type ThemeType = "light" | "dark" | "system";

export type ThemeColorsType = {
  dark: boolean;
  colors: {
    themedGray: string;
    dimGray: string;
    gray: string;
    darkGray: string;
    lightGray: string;
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    white: string;
  };
};
