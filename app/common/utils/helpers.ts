import { Platform } from "react-native";

const IsIOS = Platform.OS === "ios";
const IsAndroid = Platform.OS === "android";
const IsWeb = Platform.OS === "web";

export { IsIOS, IsAndroid, IsWeb };
