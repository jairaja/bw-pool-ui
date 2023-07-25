import { View, Text } from "@/app/components/Themed";
import React from "react";
import { StyleSheet, ScrollView, GestureResponderEvent } from "react-native";
import { DataGrid } from "../components/DataGrid";
import test from "./../testData";

//betterworldbits.com

type PoolingProps = {};
const Pooling: React.FunctionComponent<PoolingProps> = () => {
  const [page, setPage] = React.useState<number>(0);
  const numberOfItemsPerPageList = [5, 10, 15, 20];
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const [items, setItems] = React.useState();

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <View style={styles.view}>
      <Text style={styles.text}>Pooling</Text>
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
