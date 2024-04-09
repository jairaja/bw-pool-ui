import SimpleCard from "@/app/common/components/simpleCard";
import { View } from "@/app/common/components/themed";
import React, { useState } from "react";
import Timelines from "./timelines";
import Locations from "./locations";
import { KeyValue, LocalTime } from "@/app/common/models/types";
import NewPost from "./_layout";

// type CarOwnerNewPostPropsType = {};
// const NewPost: React.FunctionComponent<NewPostPropsType> = ({}) => {

type CarOwnerNewPostType = {
  from?: string;
  whenDay?: string;
  whenTime?: LocalTime;
  startingPoint?: string;
  pickupPoints?: string[];
  dropPoints?: string[];
  destination?: string;
};

const CarOwnerNewPost = ({ navigation }) => {
  const [newPost, setNewPost] = useState<CarOwnerNewPostType>({});

  const update = function (
    key: string,
    value: string | number | string[]
  ): void {
    setNewPost({ ...setNewPost, [key]: value });
  };

  return (
    <View>
      <SimpleCard
        componentOrMessage={
          <Timelines
            from={newPost.from}
            whenDay={newPost.whenDay}
            whenTime={newPost.whenTime}
            onChange={update}
          />
        }
      />
      <SimpleCard
        componentOrMessage={
          <Locations
            onChange={update}
            destination={newPost.destination}
            startingPoint={newPost.startingPoint}
            pickupPoints={newPost.pickupPoints}
            dropPoints={newPost.dropPoints}
          />
        }
      />
    </View>
  );
};

export default CarOwnerNewPost;
