import SimpleCard from "@/app/common/components/simpleCard";
import React, { useEffect, useRef, useState } from "react";
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
import { NewPostValuesType } from "./riderNewPost";
// import { NewPostValuesType, NewPostValuesType } from "./riderNewPost";
// import { addNewPost } from "./addPostInDB";
import { FirestoreService } from "../../../../service/service";

export type CarOwnerNewPostValuesType = NewPostValuesType & {
  // id?: string;
  startingPoint?: string;
  destination?: string;
  fuelType?: (typeof FUEL_TYPE)[number];
  refueling?: boolean;
};

// Remove RiderNewPostValuesType from RiderNewPostType
// export type CarOwnerNewPostValuesType = CarOwnerNewPostValuesType &
//   NewPostValuesType;

// Seat cancellation policy...in the form or with every post, as a policy reminder.
const CarOwnerNewPost: React.FunctionComponent = ({ navigation }) => {
  const poolShareRef = useRef<number[]>([]);
  // let onModalAction;

  const onModalClose = () => {
    console.log(`******* posting ${JSON.stringify(newPost)}`);

    update("actionSummaryModal", {
      ...newPost.actionSummaryModal,
      visible: false,
    });
    console.log(`******* posting ${JSON.stringify(newPost)}`);
  };

  const onModalAction = () => {
    console.log(`******* posting ${JSON.stringify(newPost)}`);
    // addNewPost(newPost);
    FirestoreService.add("poolingPosts", newPost);
    onModalClose();
    reset();
  };

  const initialState: CarOwnerNewPostValuesType = {
    poolShare: poolShareRef?.current[0],
    pickupPoints: [],
    dropPoints: [],
    actionSummaryModal: {
      visible: false,
      modalType: "CONFIRMCANCEL",
      componentOrMessage: "",
      onClose: onModalClose,
      onAction: onModalAction,
      actionObject: undefined,
    },
  };

  const [newPost, setNewPost] =
    useState<CarOwnerNewPostValuesType>(initialState);

  const allMandatoryFieldsHaveValues =
    newPost.startingFrom &&
    IsTimeUpdated(newPost.startingWhen) &&
    newPost.startingPoint &&
    newPost.fuelType &&
    newPost.destination &&
    newPost.communicationMode &&
    newPost.poolShare;

  const update = function (
    key: string,
    value:
      | string
      | string[]
      | ModalPropsType<CarOwnerNewPostValuesType>
      | number
      | undefined
      | boolean
      | Date
  ): void {
    setNewPost((prevState) => ({ ...prevState, [key]: value }));
  };

  const reset = function () {
    setNewPost(initialState);
  };

  const post = function () {
    // const { actionSummaryModal, ...newPostTemp } = newPost;
    // console.log(`******* posting ${JSON.stringify(newPost)}`);
    // console.log(`******* posting ${JSON.stringify(newPostTemp)}`);
    // addNewPost(newPostTemp);

    update("actionSummaryModal", {
      ...newPost.actionSummaryModal,
      visible: true,
      componentOrMessage: GetSummary({
        riderOwner: "Owner",
        ...newPost,
      }),
      heading: "Car Owner New Post",
      // actionOb,
      // onAction:
    });
    // console.log(`******* posting ${JSON.stringify(newPost)}`);
    // console.log(`******* posting ${JSON.stringify(newPostTemp)}`);
  };

  useEffect(() => {
    if (Array.isArray(SHARE_PER_SEAT)) {
      poolShareRef.current = SHARE_PER_SEAT;
    }
    update("actionSummaryModal", {
      ...newPost.actionSummaryModal,
      onClose: onModalClose,
      onAction: onModalAction,
    });
  }, []);

  return (
    <KeyboardAvoidingView behavior={IsIOS ? "position" : "padding"}>
      <ScrollView>
        <SimpleCard
          componentOrMessage={
            <>
              <Timelines
                forRiderOrOwner="Owner"
                startingFrom={newPost.startingFrom}
                startingWhen={newPost.startingWhen}
                onChange={update}
              />
              <Divider />
              <Locations
                forRiderOrOwner="Owner"
                onChange={update}
                destination={newPost.destination}
                startingPoint={newPost.startingPoint}
                pickupPoints={newPost.pickupPoints}
                dropPoints={newPost.dropPoints}
              />
              <Divider />

              <CarDetails
                forRiderOrOwner="Owner"
                onChange={update}
                fuelType={newPost.fuelType}
                refueling={newPost.refueling}
                bootspace={newPost.bootspace}
                luggage={newPost.luggage}
                poolShare={newPost.poolShare}
              />

              <ActionsAndMisc
                onChange={update}
                notes={newPost.notes}
                forRiderOrOwner="Owner"
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
