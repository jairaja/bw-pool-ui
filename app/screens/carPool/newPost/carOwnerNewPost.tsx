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
import { FirestoreService } from "../../../service/service";
import {
  getPoolingPostsFirebaseType,
  PoolingPostsFirebaseType,
} from "@/app/common/models/service";

export type CarOwnerNewPostValuesType = {
  // id?: string;
  startingPoint?: string;
  destinationPoint?: string;
  fuelType?: (typeof FUEL_TYPE)[number];
  refueling?: boolean;
} & NewPostValuesType;

// Remove RiderNewPostValuesType from RiderNewPostType
// export type CarOwnerNewPostValuesType = CarOwnerNewPostValuesType &
//   NewPostValuesType;

// Seat cancellation policy...in the form or with every post, as a policy reminder.
const CarOwnerNewPost: React.FunctionComponent = ({ navigation }) => {
  const poolShareRef = useRef<number[]>([]);
  const initialState: CarOwnerNewPostValuesType = {
    poolShare: poolShareRef?.current[0],
    pickupPoints: [],
    dropPoints: [],
    postedToBackend: false,
    actionSummaryModal: {
      visible: false,
      modalType: "CONFIRMCANCEL",
      componentOrMessage: "",
      onClose: () => {},
      onAction: () => {},
      actionObject: undefined,
    },
  };
  const [newPost, setNewPost] =
    useState<CarOwnerNewPostValuesType>(initialState);

  const reset = () => {
    setNewPost(initialState);
  };

  useEffect(() => {
    if (!newPost.postedToBackend) return;
    console.log(`******* Firestore ${JSON.stringify(newPost)}`);

    const tempNewPost = getPoolingPostsFirebaseType(newPost, "Owner");
    // delete tempNewPost.postedToBackend;
    // delete tempNewPost.actionSummaryModal;
    // tempNewPost.startingWhen = new Date(tempNewPost.startingWhen).getSeconds();
    // // tempNewPost.startingWhen = Date.parse(tempNewPost.startingWhen) / 1000;
    // tempNewPost.riderOwner = "Owner";
    console.log(`******* Firestore ${JSON.stringify(tempNewPost)}`);

    FirestoreService.add("poolingPosts", tempNewPost).catch((e) =>
      console.error("Failed to add post", e),
    );
    reset();
    navigation?.navigate("Car Pool");
  }, [newPost.postedToBackend]);

  const onModalClose = () => {
    update("actionSummaryModal", {
      ...newPost.actionSummaryModal,
      visible: false,
    });
  };

  const onModalAction = () => {
    update("postedToBackend", true);
    onModalClose();
    // console.log(`++++ Action ${JSON.stringify(newPost)}`);
    // addNewPost(newPost);
    // FirestoreService.add("poolingPosts", newPost);

    // reset();
    // //Navigate to home page after posting
    // navigation?.navigate("Car Pool");
    // console.log(`++++ Action ${JSON.stringify(newPost)}`);
  };

  // const initialState: CarOwnerNewPostValuesType = {
  //   poolShare: 15,
  //   pickupPoints: ["hatfield"],
  //   dropPoints: ["brookmansPark"],
  //   actionSummaryModal: {
  //     visible: true,
  //     modalType: "CONFIRMCANCEL",
  //     componentOrMessage:
  //       "Seats Available - from Hatfield to London.\nToday - Sat, 17\\Jan\\2026 - at 6 : 32  pm.\n\nStarting from - welhamGreen.\nPickup points - hatfield.\nDrop points - brookmansPark.\nDestination - hatfield.\n\nCar fuel type is Petrol. Refueling on the way.\nBootspace available - for a Small Bag size bag.\n\nPreferred communication mode - Call.\n\nPool Share - £ 15\n\nAdditional Notes: Test\n\nRegards.",
  //     heading: "Car Owner New Post",
  //   },
  //   startingFrom: "Hatfield to London",
  //   // startingWhen: "2026-01-17T13:02:00.000Z",
  //   startingPoint: "welhamGreen",
  //   destination: "hatfield",
  //   refueling: true,
  //   bootspace: true,
  //   fuelType: "Petrol",
  //   luggage: "Small Bag",
  //   communicationMode: "Call",
  //   notes: "Test\n\nRegards",
  // };

  // console.log(`++++ New Post State: ${JSON.stringify(newPost)}`);

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
      | ModalPropsType<CarOwnerNewPostValuesType>
      | number
      | undefined
      | boolean
      | Date,
  ): void {
    // console.log(`++++ Updating state ${JSON.stringify(newPost)}`);
    // console.log(
    //   `++++ Updated state ${JSON.stringify({ ...newPost, [key]: value })}`,
    // );

    setNewPost((prevState) => ({ ...prevState, [key]: value }));
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
    <KeyboardAvoidingView
      behavior={IsIOS ? "padding" : "height"}
      keyboardVerticalOffset={IsIOS ? 0 : 500}
      // style={{ flex: 1 }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 16 }}
      >
        <SimpleCard
          componentOrMessage={
            <>
              <Timelines
                forRiderOrOwner="Owner"
                fromTo={newPost.fromTo}
                startingWhen={newPost.startingWhen}
                onChange={update}
              />
              <Divider />
              <Locations
                forRiderOrOwner="Owner"
                onChange={update}
                destinationPoint={newPost.destinationPoint}
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
              <Divider />
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
