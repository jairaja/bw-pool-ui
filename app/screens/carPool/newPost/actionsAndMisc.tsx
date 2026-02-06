import { GetChildButtons } from "@/app/common/components/choiceButtons/choiceButtons";
import LabeledChoiceButtons from "@/app/common/components/labeledChoiceButtons";
import Modal, { ModalPropsType } from "@/app/common/components/modal";
import React, { useEffect, useRef } from "react";
import { Divider, TextInput } from "@/app/common/components/themed";
import ActionButtons from "./actionButtons";
import { COMMUNICATION_MODE } from "@/config";
import { RiderOwner } from "@/app/common/models/basic";
import { StyleSheet } from "react-native";
import { type PoolingPostsFirebaseType } from "@/app/common/models/service";

type ActionAndMiscPropType = {
  onChange: (key: string, value: string) => void;
  riderOwner: RiderOwner;
  notes?: string;
  communicationMode?: string;
  reset: () => void;
  post: () => void;
  postingDisabled?: boolean;
  actionSummaryModal: ModalPropsType<PoolingPostsFirebaseType>;
};

export default function ActionsAndMisc({
  onChange,
  post,
  reset,
  postingDisabled,
  riderOwner,
  notes,
  communicationMode,
  actionSummaryModal,
}: ActionAndMiscPropType) {
  const communicationModeRef = useRef<string[]>([]);
  useEffect(() => {
    if (Array.isArray(COMMUNICATION_MODE)) {
      communicationModeRef.current = [...COMMUNICATION_MODE];
    }
  }, []);

  return (
    <>
      <TextInput
        style={styles.notesInput}
        label="Optional Notes"
        value={notes}
        multiline
        placeholder={
          riderOwner === "Owner"
            ? "Car make, number, instructions etc.."
            : "Any question, special request, etc.."
        }
        onChangeText={(newNotes) => onChange("notes", newNotes)}
      />
      <LabeledChoiceButtons
        buttons={GetChildButtons(communicationModeRef.current)}
        label="Preferred communication mode:"
        mode="block"
        nullable
        value={communicationMode ?? ""}
        onValueChange={(newValue: string) =>
          onChange("communicationMode", newValue)
        }
        multiSelect={false}
      />
      <Divider />
      <ActionButtons
        reset={reset}
        post={post}
        disablePosting={postingDisabled}
      />

      <Modal
        {...actionSummaryModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  notesInput: { marginBottom: 20, marginTop: 20 },
});
