import { Text, View } from "@/app/components/Themed";
import React from "react";
import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { Animated, StyleSheet } from "react-native";
import { IsIOS } from "../utils/helpers";
import test from "../utils/testData";
import ChoiceButtons from "../components/ChoiceButtons";
import DataGrid from "../components/DataGrid";
import FloatingButton from "../components/FloatingButton";
import Modal, { IModalProps } from "../components/Modal";
import iPostDataTableItem from "../models/iPostDataTableItem";

//betterworldbits.com
//bwapps.com

type PoolingProps = {};

const Pooling: React.FunctionComponent<PoolingProps> = () => {
  const [items, setItems] = React.useState(test.items);
  const onModalClose = () => {
    setModalProps({ ...modalProps, visible: false, message: "" });
  };

  const { current: velocity } = React.useRef<Animated.Value>(
    new Animated.Value(0)
  );

  const [extended, setExtended] = React.useState<boolean>(true);

  const [modalProps, setModalProps] = React.useState({
    visible: false,
    message: "",
    onClose: onModalClose,
  } as IModalProps);

  const [filters, setFilters] = React.useState([] as string[]);

  const onRowPress = (item: iPostDataTableItem) => {
    console.log(JSON.stringify(item));
    setModalProps({
      ...modalProps,
      visible: true,
      message: item.desc,
      heading: item.fromTo,
    });
  };

  const filtersChanged = (values: string[]) => {
    console.log(JSON.stringify(values));
    setFilters(values);
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
    <View style={styles.view}>
      <View style={styles.filters}>
        <Text style={styles.text}>Filters:</Text>
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
            {
              value: "r2g",
              label: "Rtk2Ggn",
              showSelectedCheck: true,
            },
          ]}
        />
      </View>

      <DataGrid
        items={items}
        onRowPress={onRowPress}
        firstColMinWidhtFifty
        columnsDef={[
          { title: "Description", key: "desc" },
          { title: "Share PP", numeric: true, key: "sharePp" },
          { title: "Start Time", numeric: true, key: "startTime" },
        ]}
        onScroll={onScroll}
      />

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
    // width: "85%",
  },
});

export default Pooling;
