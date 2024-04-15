import LabeledChoiceButtons from "@/app/common/components/labeledChoiceButtons";
import { View } from "@/app/common/components/themed";
import React, { useState } from "react";
import CarOwnerNewPost from "./carOwnerNewPost";
import RiderNewPost from "./riderNewPost";

type NewPostType = "carOwner" | "rider" | undefined;
// const NewPost: React.FunctionComponent<NewPostPropsType> = ({}) => {

type NewPostPropsType = {};

const NewPost = ({}: NewPostPropsType) => {
  const [newPostType, setNewPostType] = useState<NewPostType>("carOwner");
  return (
    <View>
      <LabeledChoiceButtons
        label="I am a: "
        value={newPostType ?? ""}
        mode="inline"
        onValueChange={(value) => {
          setNewPostType(value as NewPostType);
        }}
        buttons={[
          {
            value: "carOwner",
            label: "Car Owner",
            showSelectedCheck: true,
          },
          {
            value: "rider",
            label: "Rider",
            showSelectedCheck: true,
          },
        ]}
        multiSelect={false}
      />
      {newPostType === "carOwner" ? <CarOwnerNewPost /> : <RiderNewPost />}
    </View>
  );
};

export default NewPost;
