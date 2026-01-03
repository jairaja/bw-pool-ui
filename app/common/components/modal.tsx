import { Text, View } from "@/app/common/components/themed";
import React from "react";
import { ButtonIcon, Divider } from "./themed";

import { StyleSheet } from "react-native";
import { Portal, Modal as RNModal } from "react-native-paper";

export type ModalType = "CONTACT" | "INFO" | "CONFIRMCANCEL" | "YESNO";

export interface NonActionModalPropsType {
  visible: boolean;
  modalType: "CONTACT" | "INFO" | "YESNO";
  componentOrMessage: React.ReactNode;
  heading?: string;
  onClose: () => void;
}

export interface ActionModalPropsType<T> {
  visible: boolean;
  modalType: "CONFIRMCANCEL";
  componentOrMessage: React.ReactNode;
  heading?: string;
  onClose: () => void;
  onAction: (actionObj?: T) => void;
  actionObject?: T;
}

export type ModalPropsType<T> =
  | NonActionModalPropsType
  | ActionModalPropsType<T>;

const Modal = <T,>(props: ModalPropsType<T>) => {
  const { visible, modalType, componentOrMessage, heading, onClose } = props;

  // const isActionModalPropsType =
  //   (props as ActionModalPropsType<T>).onAction !== undefined;

  let onAction: undefined | { (actionObj?: T): void },
    actionObject: undefined | T;

  if (modalType === "CONFIRMCANCEL") {
    const actionModalProps = props as ActionModalPropsType<T>;
    onAction = actionModalProps.onAction;
    actionObject = actionModalProps.actionObject;
  }

  //TODO add themed buttons
  const getModalFooter = function (modalType: ModalType) {
    switch (modalType) {
      case "CONTACT":
        return <Text>Contact</Text>;
      case "INFO":
        return <Text>OK</Text>;
      case "CONFIRMCANCEL":
        return (
          <View style={styles.footerButtons}>
            <ButtonIcon onPress={onClose}>
              <Text>Cancel</Text>
            </ButtonIcon>
            <ButtonIcon
              onPress={() => {
                onAction!(actionObject);
              }}
            >
              <Text>Confirm</Text>
            </ButtonIcon>
          </View>
        );
      case "YESNO":
        return <Text>yesNo</Text>;
      default:
        return (
          <ButtonIcon onPress={onClose}>
            <Text>Cancel</Text>
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
