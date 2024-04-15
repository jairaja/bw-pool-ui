import React from "react";
import { StyleSheet } from "react-native";
import { generateBoxShadowStyle } from "../utils/themeHelper";
import { View, Text } from "./themed";

type SimpleCardPropsType = {
  componentOrMessage: React.ReactNode;
  elevation?: number;
};

const SimpleCard = ({
  componentOrMessage,
  elevation = 4,
}: SimpleCardPropsType) => {
  const cardStyle = generateBoxShadowStyle({ elevation });
  return (
    <View style={[cardStyle, styles.card]}>
      {typeof componentOrMessage === "string" ? (
        <Text>{componentOrMessage}</Text>
      ) : (
        componentOrMessage
      )}
    </View>
  );
};

export default SimpleCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    flex: 1,
    margin: 5,
    paddingHorizontal: 25,
    paddingVertical: 20,
    width: "98.6%",
  },
});
