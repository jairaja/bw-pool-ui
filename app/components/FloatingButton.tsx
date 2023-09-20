import React from "react";
import { Animated, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { AnimatedFAB, useTheme } from "react-native-paper";
import { IsIOS } from "../utils/helpers";

type FloatingButtonProps = {
  animatedValue: Animated.Value;
  visible: boolean;
  extended: boolean;
  label: string;
  animateFrom: "left" | "right";
  iconMode?: "static" | "dynamic";
  style?: StyleProp<ViewStyle>;
  // iconName?: string;
};

const FloatingButton = ({
  animatedValue,
  visible,
  extended,
  label,
  animateFrom,
  style,
  iconMode,
}: FloatingButtonProps) => {
  const [isExtended, setIsExtended] = React.useState(true);
  const { isV3 } = useTheme();

  React.useEffect(() => {
    if (!IsIOS) {
      animatedValue.addListener(({ value }: { value: number }) => {
        setIsExtended(value <= 0);
      });
    } else setIsExtended(extended);
  }, [animatedValue, extended, IsIOS]);

  const fabStyle = { [animateFrom]: 16 };

  return (
    <AnimatedFAB
      icon={"plus"}
      label={label}
      extended={isExtended}
      uppercase={!isV3}
      onPress={() => console.log("Pressed")}
      visible={visible}
      animateFrom={animateFrom}
      iconMode={iconMode}
      // style={[styles.fabStyle, style, fabStyle]}
      style={[style, fabStyle]}
    />
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  fabStyle: {
    bottom: 80,
    position: "absolute",
  },
});
