import { ButtonIcon, View } from "@/app/common/components/themed";
import React from "react";
import { StyleSheet } from "react-native";

type ActionButtonsPropsType = {
  reset: () => void;
  post: () => void;
  disablePosting?: boolean;
};

const ActionButtons: React.FunctionComponent<ActionButtonsPropsType> = ({
  reset,
  post,
  disablePosting,
}: ActionButtonsPropsType) => {
  return (
    <View style={styles.container}>
      <ButtonIcon onPress={reset}>{"Reset"}</ButtonIcon>
      <ButtonIcon disabled={disablePosting} onPress={post}>
        {"Post"}
      </ButtonIcon>
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
  },
});
