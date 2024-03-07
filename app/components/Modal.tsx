import { Text } from "@/app/components/Themed";
import React from "react";
import { Divider, Portal, Modal as RNModal } from "react-native-paper";

export type IModalProps = {
  visible: boolean;
  modalType?: "contact" | "info";
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

  return (
    <Portal>
      <RNModal
        style={{
          height: "100%",
          maxWidth: "90%",
          alignSelf: "center",
          margin: 10,
        }}
        visible={modalVisible}
        onDismiss={onClose}
        contentContainerStyle={containerStyle}
      >
        {heading ? (
          <>
            <Text>{heading}</Text>
            <Divider />
          </>
        ) : (
          <></>
        )}
        {component ?? <Text>{message}</Text>}
      </RNModal>
    </Portal>
  );
};

export default Modal;
