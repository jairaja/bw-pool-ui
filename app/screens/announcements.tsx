import { View, Text } from "@/app/common/components/themed";
import React from "react";
import { StyleSheet } from "react-native";

type AnnouncementsProps = {};
const Announcements: React.FunctionComponent<AnnouncementsProps> = () => {
  return (
    <>
      <View style={styles.view}>
        <Text style={styles.text}>Announcements</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 10,
  },
  text: {
    textAlign: "center",
    padding: 5,
  },
  more: {
    marginVertical: 20,
  },
  button: {
    width: 120,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default Announcements;
