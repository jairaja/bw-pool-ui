import SimpleCard from "@/app/common/components/simpleCard";
import React, { useEffect, useRef, useState } from "react";
import Timelines from "./timelines";
import Locations from "./locations";
import { Divider } from "react-native-paper";
import LabeledChoiceButtons from "@/app/common/components/labeledChoiceButtons";
import {
  CURRENCY_SYMBOL,
  FUEL_TYPE,
  SHARE_PER_SEAT,
  COMMUNICATION_MODE,
} from "@/config";
import LabeledSwitch from "@/app/common/components/labeledSwitch";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { LabeledSlider } from "@/app/common/components/labeledSlider";
import { IsIOS } from "@/app/common/utils/helpers";
import { TextInput } from "@/app/common/components/themed";
import ActionButtons from "./actionButtons";
import {
  ChildButtonProps,
  GetChildButtons,
} from "@/app/common/components/choiceButtons/choiceButtons";
import { IsTimeUpdated } from "@/app/common/utils/dateTimeHelper";

// type CarOwnerNewPostPropsType = {};
// const NewPost: React.FunctionComponent<NewPostPropsType> = ({}) => {

export type CarOwnerNewPostType = {
  from?: string;
  when?: Date;
  startingPoint?: string;
  pickupPoints?: string[];
  dropPoints?: string[];
  destination?: string;
  fuelType?: (typeof FUEL_TYPE)[number];
  refueling?: boolean;
  bootspace?: boolean;
  luggage?: string;
  poolShare?: number;
  notes?: string;
  communicationMode?: string;
};

const CarOwnerNewPost: React.FunctionComponent<CarOwnerNewPostType> = ({
  navigation,
}) => {
  const poolShareRef = useRef<number[]>([]);
  const fuelTypeButtonsRef = useRef<string[]>([]);
  const communicationModeRef = useRef<string[]>([]);

  const initialState = {
    poolShare: poolShareRef?.current[0],
  };
  const [newPost, setNewPost] = useState<CarOwnerNewPostType>(initialState);

  const allMandatoryFieldsHaveValues =
    newPost.from &&
    IsTimeUpdated(newPost.when) &&
    newPost.startingPoint &&
    newPost.fuelType &&
    newPost.destination &&
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
    if (Array.isArray(FUEL_TYPE)) {
      fuelTypeButtonsRef.current = [...FUEL_TYPE];
    }
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
                from={newPost.from}
                when={newPost.when}
                onChange={update}
              />
              <Divider />
              <Locations
                onChange={update}
                destination={newPost.destination}
                startingPoint={newPost.startingPoint}
                pickupPoints={newPost.pickupPoints}
                dropPoints={newPost.dropPoints}
              />
              <Divider />
              <LabeledChoiceButtons
                label="Car fuel type:   "
                value={newPost.fuelType ?? ""}
                mode="block"
                nullable
                onValueChange={(value) => {
                  update("fuelType", value);
                }}
                buttons={GetChildButtons(fuelTypeButtonsRef.current)}
                multiSelect={false}
              />
              <LabeledSwitch
                label="Refueling on the way: "
                value={newPost.refueling}
                onValueChange={(newValue: boolean) => {
                  update("refueling", newValue);
                }}
              />
              <LabeledSwitch
                label="Bootspace available: "
                value={newPost.bootspace}
                onValueChange={(newValue: boolean) => {
                  update("bootspace", newValue);
                }}
              />
              <LabeledChoiceButtons
                label="Space available for (optional):   "
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
                label="Pool share per seat: "
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
                placeholder="Car make, number, etc.."
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

export default CarOwnerNewPost;
