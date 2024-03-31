module.exports = {
  env: {
    browser: true,
    es2021: true,
    "react-native/react-native": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-native/all",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    jsx: true,
  },
  plugins: ["@typescript-eslint", "react", "react-native"],
  rules: {
    "react-native/no-unused-styles": 1,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 1,
    "react-native/no-color-literals": 1,
    "react-native/no-raw-text": 1,
    "react-native/no-single-element-style-arrays": 2,
    // "react/jsx-uses-react": 0,
    // "react/react-in-jsx-scope":0,
  },
};
