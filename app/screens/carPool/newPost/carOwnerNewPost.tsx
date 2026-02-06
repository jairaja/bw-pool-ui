import SimpleCard from "@/app/common/components/simpleCard";
import React, { useState } from "react";
import Timelines from "./timelines";
import Locations from "./locations";
import { FUEL_TYPE, SHARE_PER_SEAT } from "@/config";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { IsIOS } from "@/app/common/utils/helpers";
import { IsTimeUpdated } from "@/app/common/utils/dateTimeHelper";
import CarDetails from "./carDetails";
import { ModalPropsType } from "@/app/common/components/modal";
import { GetSummary } from "@/app/common/utils/summaryHelper";
import ActionsAndMisc from "./actionsAndMisc";
import { Divider } from "@/app/common/components/themed";
import { RiderNewPostValuesType } from "./riderNewPost";
// import { NewPostValuesType, NewPostValuesType } from "./riderNewPost";
// import { addNewPost } from "./addPostInDB";
import { FirestoreService } from "../../../service/service";
import {
  getPoolingPostsFirebaseType,
  type PoolingPostsFirebaseType,
} from "@/app/common/models/service";

export type CarOwnerNewPostValuesType = {
  // id?: string;
  startingPoint?: string;
  destinationPoint?: string;
  fuelType?: (typeof FUEL_TYPE)[number];
  refueling?: boolean;
} & RiderNewPostValuesType;

// Remove RiderNewPostValuesType from RiderNewPostType
// export type CarOwnerNewPostValuesType = CarOwnerNewPostValuesType &
//   NewPostValuesType;

// Seat cancellation policy...in the form or with every post, as a policy reminder.
const CarOwnerNewPost: React.FunctionComponent = ({ navigation }) => {
  const onModalClose = () => {
    update("actionSummaryModal", {
      ...newPost.actionSummaryModal,
      visible: false,
    });
  };

  const onModalAction = (actionObj?: PoolingPostsFirebaseType) => {
    console.log(JSON.stringify(actionObj));
    FirestoreService.add("poolingPosts", actionObj).catch((e) =>
      console.error("Failed to add post", e),
    );
    onModalClose();
    reset();
    navigation?.navigate("Car Pool");
  };

  const initialState: CarOwnerNewPostValuesType = {
    riderOwner: "Owner",
    poolShare: SHARE_PER_SEAT[0],
    pickupPoints: [],
    dropPoints: [],
    actionSummaryModal: {
      visible: false,
      modalType: "CONFIRMCANCEL",
      componentOrMessage: "",
      onClose: onModalClose,
      onAction: onModalAction,
      actionObject: {} as PoolingPostsFirebaseType,
    },
  };

  const [newPost, setNewPost] =
    useState<CarOwnerNewPostValuesType>(initialState);

  const reset = () => {
    setNewPost(initialState);
  };

  const allMandatoryFieldsHaveValues =
    newPost.fromTo &&
    IsTimeUpdated(newPost.startingWhen) &&
    newPost.startingPoint &&
    newPost.fuelType &&
    newPost.destinationPoint &&
    newPost.communicationMode &&
    newPost.poolShare;

  const update = function (
    key: string,
    value:
      | string
      | string[]
      | ModalPropsType<PoolingPostsFirebaseType>
      | number
      | undefined
      | boolean
      | Date,
  ): void {
    setNewPost((prevState) => ({ ...prevState, [key]: value }));
  };

  const post = function () {
    update("actionSummaryModal", {
      ...newPost.actionSummaryModal,
      visible: true,
      componentOrMessage: GetSummary(newPost),
      heading: "Car Owner New Post",
      actionObject: getPoolingPostsFirebaseType(newPost),
    } as ModalPropsType<PoolingPostsFirebaseType>);
  };

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
                riderOwner="Owner"
                fromTo={newPost.fromTo}
                startingWhen={newPost.startingWhen}
                onChange={update}
              />
              <Divider />
              <Locations
                riderOwner="Owner"
                onChange={update}
                destinationPoint={newPost.destinationPoint}
                startingPoint={newPost.startingPoint}
                pickupPoints={newPost.pickupPoints}
                dropPoints={newPost.dropPoints}
              />
              <Divider />
              <CarDetails
                riderOwner="Owner"
                onChange={update}
                fuelType={newPost.fuelType}
                refueling={newPost.refueling}
                bootspace={newPost.bootspace}
                luggage={newPost.luggage}
                poolShare={newPost.poolShare}
              />
              <Divider />
              <ActionsAndMisc
                onChange={update}
                notes={newPost.notes}
                riderOwner="Owner"
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

export default CarOwnerNewPost;
