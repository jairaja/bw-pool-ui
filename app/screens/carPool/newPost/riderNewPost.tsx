import SimpleCard from "@/app/common/components/simpleCard";
import { IsTimeUpdated } from "@/app/common/utils/dateTimeHelper";
import { IsIOS } from "@/app/common/utils/helpers";
import { COMMUNICATION_MODE, ROUTE_INFO, SHARE_PER_SEAT } from "@/config";
import React, { FC, useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import Locations from "./locations";
import Timelines from "./timelines";
import CarDetails from "./carDetails";
import { ModalPropsType } from "@/app/common/components/modal";
import { GetSummary } from "@/app/common/utils/summaryHelper";
import ActionsAndMisc from "./actionsAndMisc";
import { Divider } from "@/app/common/components/themed";
// import { addNewPost } from "../../../../service/addPostInDB";
import { FirestoreService } from "../../../service/service";
import {
  getPoolingPostsFirebaseType,
  type PoolingPostsFirebaseType,
} from "@/app/common/models/service";
import { RiderOwner } from "@/app/common/models/basic";

export type RiderNewPostValuesType = {
  id?: string;
  riderOwner: RiderOwner;
  fromTo?: (typeof ROUTE_INFO)[number];
  startingWhen?: Date;
  pickupPoints: string[];
  dropPoints: string[];
  bootspace?: boolean;
  luggage?: string;
  poolShare?: number;
  notes?: string;
  communicationMode?: (typeof COMMUNICATION_MODE)[number];
  actionSummaryModal: ModalPropsType<PoolingPostsFirebaseType>;
};

const RiderNewPost: FC = ({ navigation }) => {
  const poolShareRef = useRef<number[]>([]);

  const onModalClose = () => {
    update("actionSummaryModal", {
      ...newPost.actionSummaryModal,
      visible: false,
    });
  };

  const onModalAction = (actionObj?: PoolingPostsFirebaseType) => {
    console.log(JSON.stringify(actionObj));
    try {
      FirestoreService.add("poolingPosts", actionObj);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    onModalClose();
    reset();
    navigation?.navigate("Car Pool");
  };

  const initialState: RiderNewPostValuesType = {
    riderOwner: "Rider",
    poolShare: SHARE_PER_SEAT[0],
    pickupPoints: [],
    dropPoints: [],
    actionSummaryModal: {
      visible: false,
      modalType: "CONFIRMCANCEL",
      componentOrMessage: "",
      onClose: onModalClose,
      onAction: onModalAction,
    },
  };
  const [newPost, setNewPost] = useState<RiderNewPostValuesType>(initialState);

  const allMandatoryFieldsHaveValues =
    newPost.fromTo &&
    IsTimeUpdated(newPost.startingWhen) &&
    newPost.pickupPoints.length > 0 &&
    newPost.dropPoints.length > 0 &&
    newPost.communicationMode &&
    newPost.poolShare;

  const update = function (
    key: string,
    value:
      | string
      | string[]
      | number
      | undefined
      | boolean
      | Date
      | ModalPropsType<PoolingPostsFirebaseType>,
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
      componentOrMessage: GetSummary(newPost),
      heading: "Rider New Post",
      actionObject: getPoolingPostsFirebaseType(newPost),
    } as ModalPropsType<PoolingPostsFirebaseType>);
  };

  useEffect(() => {
    if (Array.isArray(SHARE_PER_SEAT)) {
      poolShareRef.current = [...SHARE_PER_SEAT];
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={IsIOS ? "padding" : "height"}
      keyboardVerticalOffset={IsIOS ? 0 : 50}
      // style={{ flex: 1 }}
    >
      <ScrollView
        keyboardShouldPersistTaps="never"
        // keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 16 }}
      >
        <SimpleCard
          componentOrMessage={
            <>
              <Timelines
                riderOwner="Rider"
                fromTo={newPost.fromTo}
                startingWhen={newPost.startingWhen}
                onChange={update}
              />
              <Divider />
              <Locations
                riderOwner="Rider"
                onChange={update}
                pickupPoints={newPost.pickupPoints}
                dropPoints={newPost.dropPoints}
              />
              <Divider />
              <CarDetails
                riderOwner="Rider"
                onChange={update}
                bootspace={newPost.bootspace}
                luggage={newPost.luggage}
                poolShare={newPost.poolShare}
              />

              <ActionsAndMisc
                onChange={update}
                notes={newPost.notes}
                riderOwner="Rider"
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
