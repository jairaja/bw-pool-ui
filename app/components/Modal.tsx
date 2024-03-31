import { Text, View } from "@/app/components/themed";
import React from "react";
import { Button as ButtonWithIcon } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Divider, Portal, Modal as RNModal } from "react-native-paper";
import { themePrimaryColorOverridden } from "../utils/themeHelper";

export type ModalPropsType = {
  visible: boolean;
  modalType?: "contact" | "info" | "confirmCancel" | "yesNo";
  componentOrMessage: React.ReactNode;
  heading?: string;
  onClose: () => void;
};

const Modal = (props: ModalPropsType) => {
  const { visible, modalType, componentOrMessage, heading, onClose } = props;

  //TODO add themed buttons
  const getModalFooter = function (modalType: ModalPropsType["modalType"]) {
    switch (modalType) {
      case "contact":
        return <Text>Contact</Text>;
      case "info":
        return <Text>OK</Text>;
      case "confirmCancel":
        return <Text>confirmCancel</Text>;
      case "yesNo":
        return <Text>yesNo</Text>;
      default:
        return (
          <ButtonWithIcon
            theme={themePrimaryColorOverridden("gray")}
            // style
            onPress={() => {
              onClose();
            }}
          >
            Cancel
          </ButtonWithIcon>
        );
    }
  };

  return (
    <Portal>
      <RNModal
        // theme={useTheme()}
        style={styles.rnModal}
        visible={visible}
        onDismiss={onClose}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>{heading ?? "Info"}</Text>
          <Divider style={styles.divider} />
        </View>
        <View style={styles.body}>
          {typeof componentOrMessage === "string" ? (
            <Text>{componentOrMessage}</Text>
          ) : (
            componentOrMessage
          )}
        </View>

        <Divider style={styles.divider} />
        <View style={styles.footer}>{getModalFooter(modalType)}</View>
      </RNModal>
    </Portal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  body: {
    height: "80%",
  },
  divider: {
    backgroundColor: "lightgray",
    height: 1,
  },
  footer: {
    alignItems: "center",
    height: "10%",
  },
  header: {
    height: "10%",
  },
  headerText: {
    height: "90%",
    textAlign: "center",
  },
  rnModal: {
    backgroundColor: "rgb(240,240,240)",
    borderRadius: 5,
    height: "75%",
    margin: 10,
    padding: 20,
    top: "10%",
  },
});
