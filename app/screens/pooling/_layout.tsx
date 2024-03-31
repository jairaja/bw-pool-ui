import { Text, View } from "@/app/components/themed";
import React, { useState, useEffect } from "react";
import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { Animated, StyleSheet } from "react-native";
import { IsIOS } from "../../utils/helpers";
import DataGrid from "../../components/dataGrid/_layout";
import FloatingButton from "../../components/floatingButton/_layout";
import Modal, { ModalPropsType } from "../../components/modal";
import { SafeAreaView } from "react-native-safe-area-context";
import iPostDataTableItem from "../../models/iPostDataTableItem";
import { Button as ButtonWithIcon } from "react-native-paper";
import MultiSelect from "../../components/choiceButtons/multiSelect";
import {
  useThemeColor,
} from "../../utils/themeHelper";
import NewPost from "./newPost";

type PoolingProps = {};

const Pooling: React.FunctionComponent<PoolingProps> = () => {
  const [items, setItems] = useState([]);
  const onModalClose = () => {
    setModalProps({ ...modalProps, visible: false });
  };

  const { current: velocity } = React.useRef<Animated.Value>(
    new Animated.Value(0)
  );

  const [extended, setExtended] = useState<boolean>(true);

  const [modalProps, setModalProps] = useState<ModalPropsType>({
    visible: false,
    componentOrMessage: "",
    onClose: onModalClose,
  });

  const [filters, setFilters] = useState([] as string[]);

  useEffect(() => {
    const getData = async function () {
      try {
        // ToDo - move all network requests to one place
        const fetchPosts = await fetch(
          "https://mocki.io/v1/cf332720-3b21-4c42-952a-aa41cd212520",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        console.log(fetchPosts);
        const posts = await fetchPosts.json();
        console.log(posts);
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
      componentOrMessage: item.desc,
      heading: item.fromTo,
    });
  };

  const createNewPost = () => {
    setModalProps({
      ...modalProps,
      visible: true,
      componentOrMessage: <NewPost />,
      heading: "New Post",
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
          {/* <View style={styles.staticFilters}>
            <TextWithChoiceButtons
              label="Filters : "
              mode="inline"
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
              multiSelect
            />
          </View> */}
          <Text style={styles.text}>Filters : </Text>
          <MultiSelect
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
            //TODO - remove this multiSelect
            multiSelect
          />
          <ButtonWithIcon
            icon="filter-variant"
            onTouchStart={() => {
              setModalProps({
                ...modalProps,
                visible: true,
                componentOrMessage: "Filters Modal Body ToDo",
                // component: <Button>"Filters Modal Body ToDo"</Button>,
                heading: "Select Filters:",
              });
            }}
            textColor={useThemeColor("text")}
            // theme={themePrimaryColorOverridden("text")}
          >
            {" "}
          </ButtonWithIcon>
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
          onPress={createNewPost}
          style={styles.addPostButton}
          icon={"plus"}
        />

        <Modal
          visible={modalProps.visible}
          componentOrMessage={modalProps.componentOrMessage}
          onClose={modalProps.onClose}
          heading={modalProps.heading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addPostButton: {
    bottom: 40,
    position: "absolute",
  },
  button: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 120,
  },
  filters: {
    alignItems: "center",
    flexDirection: "row",
    // justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 10,
    width: "75%",
  },
  more: {
    marginVertical: 20,
  },
  staticFilters: {
    backgroundColor: "red",
    width: "85%",
  },
  text: {
    padding: 5,
    textAlign: "center",
  },
  view: {
    // margin: 10,
    padding: 5,
    height: "100%",
    width: "100%",
  },
});

export default Pooling;
