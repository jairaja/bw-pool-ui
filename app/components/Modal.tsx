import { Text } from "@/app/components/Themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Divider, Portal, Modal as RNModal } from "react-native-paper";

export type IModalProps = {
  visible: boolean;
  modalType?: "contact" | "info" | "confirmCancel" | "yesNo";
  message?: string;
  component?: React.JSX.Element;
  heading?: string;
  onClose: () => void;
};

const Modal = (props: IModalProps) => {
  const { visible, modalType, message, component, heading, onClose } = props;

  const [modalVisible, setModalVisible] = React.useState(false);
  const containerStyle = { padding: 20 };

  React.useEffect(() => {
    setModalVisible(visible);
  }, [visible]);


  //TODO add themed buttons
  const getModalFooter = function (modalType: IModalProps["modalType"]) {
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
        return <Text>Ok</Text>;
    }
  };

  return (
    <Portal>
      <RNModal
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
        <View style={styles.footer}>
          {getModalFooter(modalType)}
        </View>
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
    backgroundColor: "gray",
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
