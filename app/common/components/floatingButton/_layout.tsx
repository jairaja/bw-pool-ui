import React from "react";
import { Animated } from "react-native";
import { AnimatedFAB, useTheme } from "react-native-paper";
import { IsIOS } from "../../../utils/helpers";
import { Props } from "react-native-paper/lib/typescript/src/components/FAB/AnimatedFAB";

import { useThemeColor } from "@/app/utils/themeHelper";

type FloatingButtonProps = {
  animatedValue: Animated.Value;
} & Props;

const FloatingButton = ({
  animatedValue,
  extended,
  animateFrom,
  style,
  ...rest
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

  const fabStyle = { [animateFrom ?? "left"]: 16 };

  return (
    <AnimatedFAB
      extended={isExtended}
      uppercase={!isV3}
      animateFrom={animateFrom}
      color={useThemeColor("text")}
      style={[
        style,
        fabStyle,
        {
          backgroundColor: useThemeColor("themedGray"),
        },
      ]}
      {...rest}
    />
  );
};

export default FloatingButton;
