import { Text, View } from "@/app/components/Themed";
import React from "react";
import { Button as ButtonWithIcon } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Divider, Portal, Modal as RNModal } from "react-native-paper";
import { themePrimaryColorOverridden } from "../utils/themeHelper";

export type ModalPropsType = {
  visible: boolean;
  modalType?: "contact" | "info" | "confirmCancel" | "yesNo";
  message?: string;
  component?: React.JSX.Element;
  heading?: string;
  onClose: () => void;
};

const Modal = (props: ModalPropsType) => {
  const { visible, modalType, message, component, heading, onClose } = props;

  const [modalVisible, setModalVisible] = React.useState(visible);
  const containerStyle = { padding: 20 };

  React.useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

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

  console.log("rendering modal" + heading);

  return (
    <Portal>
      <RNModal
        // theme={useTheme()}
        style={styles.rnModal}
        visible={modalVisible}
        onDismiss={onClose}
        contentContainerStyle={containerStyle}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>{heading ?? "Info"}</Text>
          <Divider style={styles.divider} />
        </View>
        <View style={styles.body}>{component ?? <Text>{message}</Text>}</View>
        <Divider style={styles.divider} />
        <View style={styles.footer}>{getModalFooter(modalType)}</View>
      </RNModal>
    </Portal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  rnModal: {
    height: "75%",
    margin: 10,
    borderRadius: 5,
    backgroundColor: "rgb(240,240,240)",
    top: "10%",
  },
  header: {
    height: "10%",
  },
  body: {
    height: "80%",
  },
  footer: {
    height: "10%",
    alignItems: "center",
  },
  headerText: {
    height: "90%",
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "lightgray",
  },
});
