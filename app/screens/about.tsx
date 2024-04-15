import { Text, View } from "@/app/common/components/themed";
import React from "react";
import { StyleSheet } from "react-native";
// import { useTheme } from "@react-navigation/native";

type AboutProps = {};
// const { colors } = useTheme();
// function GetThemeColor() {
//   return useTheme().colors;
// }

const About: React.FunctionComponent<AboutProps> = () => {
  // const { colors } = useTheme();

  // console.log(colors);

  return (
    <View style={styles.view}>
      <Text style={styles.text}>About screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 10,
    // backgroundColor: GetThemeColor().card,
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

export default About;
