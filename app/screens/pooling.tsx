import { View, Text } from "@/app/components/Themed";
import React from "react";
import { StyleSheet, ScrollView, GestureResponderEvent } from "react-native";
import DataGrid from "../components/DataGrid";
import test from "./../testData";

//betterworldbits.com

type PoolingProps = {};
const Pooling: React.FunctionComponent<PoolingProps> = () => {
  const [items, setItems] = React.useState(test.items);

  return (
    <View style={styles.view}>
      {/* <Text style={styles.text}>Pooling</Text> */}
      {/* Filters */}

      <DataGrid
        items={items}
        firstColMinWidhtFifty
        columnsDef={[
          { title: "Description", numberOfLines: 4, key: "desc" },
          { title: "Share PP", numeric: true, key: "sharePp" },
          { title: "Start Time", numeric: true, key: "startTime" },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 10,
    height: "auto",
    width: "100%",
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

export default Pooling;
