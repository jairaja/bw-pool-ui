import { GetChildButtons } from "@/app/common/components/choiceButtons/choiceButtons";
import LabeledChoiceButtons from "@/app/common/components/labeledChoiceButtons";
import LabeledSlider from "@/app/common/components/labeledSlider";
import LabeledSwitch from "@/app/common/components/labeledSwitch";
import SimpleCard from "@/app/common/components/simpleCard";
import { IsTimeUpdated } from "@/app/common/utils/dateTimeHelper";
import { IsIOS } from "@/app/common/utils/helpers";
import { SHARE_PER_SEAT, COMMUNICATION_MODE, CURRENCY_SYMBOL } from "@/config";
import React, { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { Divider } from "react-native-paper";
import ActionButtons from "./actionButtons";
import Locations from "./locations";
import Timelines from "./timelines";
import { TextInput } from "@/app/common/components/themed";

type RiderNewPostType = {
  from?: string;
  when?: Date;
  pickupPoints?: string[];
  dropPoints?: string[];
  bootspace?: boolean;
  luggage?: string;
  poolShare?: number;
  notes?: string;
  communicationMode?: string;
};

// const NewPost: React.FunctionComponent<NewPostPropsType> = ({}) => {
const RiderNewPost = ({ navigation }) => {
  const poolShareRef = useRef<number[]>([]);
  const communicationModeRef = useRef<string[]>([]);
  const initialState = {
    poolShare: poolShareRef?.current[0],
  };
  const [newPost, setNewPost] = useState<RiderNewPostType>(initialState);

  const allMandatoryFieldsHaveValues =
    newPost.from &&
    IsTimeUpdated(newPost.when) &&
    newPost.pickupPoints &&
    newPost.dropPoints &&
    newPost.communicationMode &&
    newPost.poolShare;

  const update = function (
    key: string,
    value: string | number | string[] | undefined | boolean | Date
  ): void {
    setNewPost((prevState) => ({ ...prevState, [key]: value }));
  };
  const reset = function () {
    setNewPost(initialState);
  };
  const post = function () {};
  useEffect(() => {
    if (Array.isArray(SHARE_PER_SEAT)) {
      poolShareRef.current = [...SHARE_PER_SEAT];
      update("poolShare", poolShareRef.current[0]);
    }
    if (Array.isArray(COMMUNICATION_MODE)) {
      communicationModeRef.current = [...COMMUNICATION_MODE];
    }
  }, []);

  return (
    <KeyboardAvoidingView behavior={IsIOS ? "position" : "padding"}>
      <ScrollView>
        <SimpleCard
          componentOrMessage={
            <>
              <Timelines
                forRiderOrOwner="Rider"
                from={newPost.from}
                when={newPost.when}
                onChange={update}
              />
              <Divider />
              <Locations
                forRiderOrOwner="Rider"
                onChange={update}
                pickupPoints={newPost.pickupPoints}
                dropPoints={newPost.dropPoints}
              />
              <Divider />
              <LabeledSwitch
                label="Bootspace required: "
                value={newPost.bootspace}
                onValueChange={(newValue: boolean) => {
                  update("bootspace", newValue);
                }}
              />
              <LabeledChoiceButtons
                label="Space required for (optional):   "
                value={newPost.luggage ?? ""}
                mode="block"
                nullable
                disabled={!newPost.bootspace}
                onValueChange={(value) => {
                  update("luggage", value);
                }}
                buttons={GetChildButtons(["Small Bag", "Medium Bag", "More"])}
                multiSelect={false}
              />
              <LabeledSlider
                label="Preferred pool share per seat: "
                minimumValue={poolShareRef.current[0]}
                maximumValue={
                  poolShareRef.current[poolShareRef.current.length - 1]
                }
                value={newPost.poolShare}
                step={10}
                displayValue={`${CURRENCY_SYMBOL ?? ""} ${newPost.poolShare}`}
                onValueChange={(newValue) => update("poolShare", newValue)}
              />
              <TextInput
                label="Optional Notes (max 100 chars)"
                value={newPost.notes}
                multiline
                placeholder="Any special request, etc.."
                onChangeText={(newNotes) => update("notes", newNotes)}
              />

              <LabeledChoiceButtons
                buttons={GetChildButtons(communicationModeRef.current)}
                label="Preferred communication mode:"
                mode="block"
                nullable
                value={newPost.communicationMode ?? ""}
                onValueChange={(newValue) =>
                  update("communicationMode", newValue)
                }
                multiSelect={false}
              />

              <Divider />

              <ActionButtons
                reset={reset}
                post={post}
                disablePosting={!allMandatoryFieldsHaveValues}
              />
            </>
          }
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RiderNewPost;
