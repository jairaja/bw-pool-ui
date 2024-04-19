import SimpleCard from "@/app/common/components/simpleCard";
import { IsTimeUpdated } from "@/app/common/utils/dateTimeHelper";
import { IsIOS } from "@/app/common/utils/helpers";
import { SHARE_PER_SEAT } from "@/config";
import React, { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import Locations from "./locations";
import Timelines from "./timelines";
import CarDetails from "./carDetails";
import { ModalPropsType } from "@/app/common/components/modal";
import { GetSummary } from "@/app/common/utils/summaryHelper";
import ActionsAndMisc from "./actionsAndMisc";
import { Divider } from "@/app/common/components/themed";

export type RiderNewPostValuesType = {
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

type RiderNewPostType = RiderNewPostValuesType & {
  actionSummaryModal: ModalPropsType;
};

const RiderNewPost: React.FunctionComponent = ({ navigation }) => {
  const poolShareRef = useRef<number[]>([]);

  const onModalClose = () => {
    update("actionSummaryModal", {
      ...newPost.actionSummaryModal,
      visible: false,
    });
  };

  const initialState = {
    poolShare: poolShareRef?.current[0],
    actionSummaryModal: {
      visible: false,
      componentOrMessage: "",
      onClose: onModalClose,
    },
  };
  const [newPost, setNewPost] = useState<RiderNewPostType>(initialState);

  const allMandatoryFieldsHaveValues =
    newPost.from &&
    IsTimeUpdated(newPost.when) &&
    newPost.pickupPoints &&
    newPost.pickupPoints.length > 0 &&
    newPost.dropPoints &&
    newPost.dropPoints.length > 0 &&
    newPost.communicationMode &&
    newPost.poolShare;

  const update = function (
    key: string,
    value:
      | string
      | number
      | string[]
      | undefined
      | boolean
      | Date
      | ModalPropsType
  ): void {
    setNewPost((prevState) => ({ ...prevState, [key]: value }));
  };

  const reset = function () {
    setNewPost(initialState);
  };

  const post = function () {
    update("actionSummaryModal", {
      ...newPost.actionSummaryModal,
      visible: true,
      componentOrMessage: GetSummary({
        riderOwner: "Rider",
        ...newPost,
      }),
      heading: "Rider New Post",
    });
  };

  useEffect(() => {
    if (Array.isArray(SHARE_PER_SEAT)) {
      poolShareRef.current = [...SHARE_PER_SEAT];
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
              <CarDetails
                forRiderOrOwner="Rider"
                onChange={update}
                bootspace={newPost.bootspace}
                luggage={newPost.luggage}
                poolShare={newPost.poolShare}
              />

              <ActionsAndMisc
                onChange={update}
                notes={newPost.notes}
                forRiderOrOwner="Rider"
                communicationMode={newPost.communicationMode}
                reset={reset}
                post={post}
                postingDisabled={!allMandatoryFieldsHaveValues}
                actionSummaryModal={newPost.actionSummaryModal}
              />
            </>
          }
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RiderNewPost;
