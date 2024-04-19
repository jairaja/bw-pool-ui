import { View, Text } from "@/app/common/components/themed";
import React from "react";
import { StyleSheet } from "react-native";

// Screen can be used for general announcements, blood requirements
// instead of posting on various whatsapp groups (manual process, prone to miss)
// WFH announcements or any other non-critical message
// For details - please check your work emails
// Tailored announcements - just for managers
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
  button: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 120,
  },
  more: {
    marginVertical: 20,
  },
  text: {
    padding: 5,
    textAlign: "center",
  },
  view: {
    margin: 10,
  },
});

export default Announcements;
