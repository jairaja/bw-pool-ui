import SimpleCard from "@/app/common/components/simpleCard";
import { View } from "@/app/common/components/themed";
import React from "react";
import Timelines from "./timelines";
import Locations from "./locations";

// type CarOwnerNewPostPropsType = {};
// const NewPost: React.FunctionComponent<NewPostPropsType> = ({}) => {
const CarOwnerNewPost = ({ navigation }) => {
  return (
    <View>
      <SimpleCard componentOrMessage={<Timelines />} />
      <SimpleCard componentOrMessage={<Locations />} />
    </View>
  );
};

export default CarOwnerNewPost;
