import React from "react";
import { Text } from "./themed";
import { Text as DefaultText } from "react-native";

export default function MonoText(props: DefaultText["props"]) {
  return <Text {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />;
}
