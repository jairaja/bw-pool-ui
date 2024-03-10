import { Text, View } from "@/app/components/Themed";
import React, { useState, useEffect } from "react";
import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { Animated, StyleSheet } from "react-native";
import { IsIOS } from "../utils/helpers";
import test from "../utils/testData";
import ChoiceButtons from "../components/ChoiceButtons";
import DataGrid from "../components/DataGrid";
import FloatingButton from "../components/FloatingButton";
import Modal, { IModalProps } from "../components/Modal";
import { SafeAreaView } from "react-native-safe-area-context";
import iPostDataTableItem from "../models/iPostDataTableItem";
import { Button } from "react-native-paper";

//betterworldbits.com
//bwapps.com

type PoolingProps = {};

const Pooling: React.FunctionComponent<PoolingProps> = () => {
  // const [items, setItems] = useState(test.items);
  const [items, setItems] = useState([]);
  const onModalClose = () => {
    setModalProps({ ...modalProps, visible: false, message: "" });
  };

  const { current: velocity } = React.useRef<Animated.Value>(
    new Animated.Value(0)
  );

  const [extended, setExtended] = useState<boolean>(true);

  const [modalProps, setModalProps] = useState({
    visible: false,
    message: "",
    component: undefined,
    onClose: onModalClose,
  } as IModalProps);

  const [filters, setFilters] = useState([] as string[]);

  useEffect(() => {
    let getData = async function () {
      try {
        // ToDo - move all network requests to one place
        let fetchPosts = await fetch(
          "https://mocki.io/v1/cf332720-3b21-4c42-952a-aa41cd212520"
        );
        let posts = await fetchPosts.json();
        setItems(posts ?? [...items]);
      } catch (error) {
        // ToDo - show some error message / blocking or Ribbon or something
        console.error(error);
      }
    };
    getData();
  }, []);

  const onRowPress = (item: iPostDataTableItem) => {
    console.log(JSON.stringify(item));
    setModalProps({
      ...modalProps,
      visible: true,
      message: item.desc,
      heading: item.fromTo,
    });
  };

  const filtersChanged = (values: string | string[]) => {
    console.log(JSON.stringify(values));
    setFilters(values as string[]);
  };

  const onScroll = (nativeEvent: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.nativeEvent?.contentOffset?.y) ?? 0;

    if (!IsIOS) {
      return velocity.setValue(currentScrollPosition);
    }

    setExtended(currentScrollPosition <= 0);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: "100%",
        // backgroundColor: theme?.colors?.grey5,
      }}
      edges={["right", "left", "bottom"]}
    >
      <View style={styles.view}>
        <View style={styles.filters}>
          <Text style={styles.text}>Filters : </Text>
          <ChoiceButtons
            isMultiSelect
            density="small"
            value={filters}
            onValueChange={filtersChanged}
            buttons={[
              {
                value: "g2r",
                label: "Ggn2Rtk",
                showSelectedCheck: true,
              },
              {
                value: "r2g",
                label: "Rtk2Ggn",
                showSelectedCheck: true,
              },
            ]}
          />
          <Button
            icon="filter-variant"
            onTouchStart={() => {
              setModalProps({
                ...modalProps,
                visible: true,
                component: <Button>"Filters Modal Body ToDo"</Button>,
                heading: "Select Filters:",
              });
            }}
          >
            {" "}
          </Button>
        </View>

        {items.length > 0 && (
          <DataGrid
            items={items}
            onRowPress={onRowPress}
            firstColMinWidhtFifty
            // onLayout={() => console.log(`Items ${items}`)}
            columnsDef={[
              { title: "Description", key: "desc" },
              { title: "Share PP", numeric: true, key: "sharePp" },
              { title: "Start Time", numeric: true, key: "startTime" },
            ]}
            onScroll={onScroll}
          />
        )}

        <FloatingButton
          visible={!modalProps.visible}
          animatedValue={velocity}
          extended={extended}
          label={"Post"}
          animateFrom={"left"}
          iconMode={"dynamic"}
          style={styles.addPostButton}
        />

        <Modal
          visible={modalProps.visible}
          message={modalProps.message}
          onClose={modalProps.onClose}
          heading={modalProps.heading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    // margin: 10,
    padding: 5,
    height: "100%",
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
  addPostButton: {
    bottom: 40,
    position: "absolute",
  },
  filters: {
    flexDirection: "row",
    alignItems: "center",
    width: "75%",
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Pooling;
