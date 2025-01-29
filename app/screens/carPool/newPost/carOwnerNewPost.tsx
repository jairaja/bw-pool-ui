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
import { RiderNewPostType, RiderNewPostValuesType } from "./riderNewPost";

export type CarOwnerNewPostValuesType = RiderNewPostValuesType & {
  startingPoint?: string;
  destination?: string;
  fuelType?: (typeof FUEL_TYPE)[number];
  refueling?: boolean;
};

// Remove RiderNewPostValuesType from RiderNewPostType
type CarOwnerNewPostType = CarOwnerNewPostValuesType & RiderNewPostType;

// Seat cancellation policy...in the form or with every post, as a policy reminder.
const CarOwnerNewPost: React.FunctionComponent = ({ navigation }) => {
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
  const [newPost, setNewPost] = useState<CarOwnerNewPostType>(initialState);

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
      | ModalPropsType
      | number
      | string[]
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
    update("actionSummaryModal", {
      ...newPost.actionSummaryModal,
      visible: true,
      componentOrMessage: GetSummary({
        riderOwner: "Owner",
        ...newPost,
      }),
      heading: "Car Owner New Post",
      // onAction:
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
