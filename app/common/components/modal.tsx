import { Text, View } from "@/app/common/components/themed";
import React from "react";
import { ButtonIcon, Divider } from "./themed";

import { StyleSheet } from "react-native";
import { Portal, Modal as RNModal } from "react-native-paper";

export type ModalType = "CONTACT" | "INFO" | "CONFIRMCANCEL" | "YESNO";

export type ModalPropsType = {
  visible: boolean;
  modalType?: ModalType;
  componentOrMessage: React.ReactNode;
  heading?: string;
  onClose: () => void;
  onAction?: (message?: string) => void;
};

const Modal = ({
  visible,
  modalType,
  componentOrMessage,
  heading,
  onClose,
}: ModalPropsType) => {
  //TODO add themed buttons
  const getModalFooter = function (modalType: ModalPropsType["modalType"]) {
    switch (modalType) {
      case "CONTACT":
        return <Text>Contact</Text>;
      case "INFO":
        return <Text>OK</Text>;
      case "CONFIRMCANCEL":
        return (
          <View style={styles.footerButtons}>
            <ButtonIcon
              onPress={() => {
                onClose();
              }}
            >
              Cancel
            </ButtonIcon>
            <ButtonIcon
              onPress={() => {
                onClose();
              }}
            >
              Confirm
            </ButtonIcon>
          </View>
        );
      case "YESNO":
        return <Text>yesNo</Text>;
      default:
        return (
          <ButtonIcon
            onPress={() => {
              onClose();
            }}
          >
            Cancel
          </ButtonIcon>
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
        </View>
        <Divider />
        <View style={styles.body}>
          {typeof componentOrMessage === "string" ? (
            <Text>{componentOrMessage}</Text>
          ) : (
            componentOrMessage
          )}
        </View>
        <Divider />
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
  footer: {
    height: "10%",
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  header: {
    height: "10%",
  },
  headerText: {
    height: "90%",
    textAlign: "center",
  },
  rnModal: {
    // backgroundColor: "rgb(240,240,240)",
    // borderRadius: 50,
    height: "75%",
    margin: 10,
    padding: 20,
    top: "10%",
  },
});
