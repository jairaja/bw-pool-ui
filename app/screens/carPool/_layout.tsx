import { Button, View, Text } from "@/app/common/components/themed";
import React, { useState, useEffect } from "react";
import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { ActivityIndicator, Animated, StyleSheet } from "react-native";
import { IsIOS } from "../../common/utils/helpers";
import DataGrid, {
  iPostDataTableItem,
} from "../../common/components/dataGrid/_layout";
import FloatingButton from "../../common/components/floatingButton/_layout";
import Modal, { ModalPropsType } from "../../common/components/modal";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconButton } from "react-native-paper";
import LabeledChoiceButtons from "@/app/common/components/labeledChoiceButtons";
import type { NavigationProp } from "@react-navigation/native";
import { FirestoreService } from "../../service/service";
import { Resource } from "@/app/common/models/basic";
import { CarOwnerNewPostValuesType } from "./newPost/carOwnerNewPost";
import { formatToTodayTomorrowOrTime } from "@/app/common/utils/dateTimeHelper";

const CarPool = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [allPoolingPosts, setAllPoolingPosts] = useState<
    Resource<CarOwnerNewPostValuesType[]>
  >({
    loadingState: "not-loaded",
  });

  const onModalClose = () => {
    setModalProps({ ...modalProps, visible: false });
  };

  const { current: velocity } = React.useRef<Animated.Value>(
    new Animated.Value(0),
  );

  const [extended, setExtended] = useState<boolean>(true);

  const [modalProps, setModalProps] = useState<ModalPropsType<unknown>>({
    visible: false,
    modalType: "INFO",
    componentOrMessage: "",
    onClose: onModalClose,
  });

  const [filters, setFilters] = useState<string[]>([]);

  const getItemsForTable = (
    items: CarOwnerNewPostValuesType[],
  ): iPostDataTableItem[] => {
    return items.map((item) => {
      return {
        description: item.fromTo ?? "Short Summary to be fixed",
        sharePp: item.poolShare,
        startTime: formatToTodayTomorrowOrTime(item.startingWhen),
      };
    });
  };

  const getPoolingPosts = async function () {
    try {
      setAllPoolingPosts({ loadingState: "loading" });
      const posts = await FirestoreService.getAll("poolingPosts");
      console.log("Pooling posts fetched:", JSON.stringify(posts));
      setAllPoolingPosts({
        loadingState: "loaded",
        data: posts as CarOwnerNewPostValuesType[],
      });
    } catch (error) {
      console.error(error);
      setAllPoolingPosts({
        loadingState: "failed",
        errorMessage: JSON.stringify(error),
      });
    }
  };

  useEffect(() => {
    getPoolingPosts();
  }, []);

  const onRowPress = (item: iPostDataTableItem) => {
    setModalProps({
      ...modalProps,
      visible: true,
      componentOrMessage: item.summary,
      heading: item.fromTo,
    });
  };

  const createNewPost = () => {
    navigation.navigate("New Post");
    // setModalProps({
    //   ...modalProps,
    //   visible: true,
    //   componentOrMessage: <NewPost />,
    //   heading: "New Post",
    // });
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
          <View>
            <LabeledChoiceButtons
              label="Filters :   "
              mode="inline"
              value={filters}
              onValueChange={filtersChanged}
              buttons={[
                {
                  value: "findRide",
                  label: "Find Ride",
                  showSelectedCheck: true,
                },
                {
                  value: "findRiders",
                  label: "Find Riders",
                  showSelectedCheck: true,
                },
              ]}
              multiSelect
            />
          </View>
          <IconButton
            icon="filter-variant"
            size={30}
            style={{ alignSelf: "auto" }}
            onPress={() => {
              setModalProps({
                ...modalProps,
                visible: true,
                componentOrMessage: "Filters Modal Body ToDo",
                // component: <Button>"Filters Modal Body ToDo"</Button>,
                heading: "Select Filters:",
              });
            }}
          />
        </View>
        {/* <Divider /> */}
        {allPoolingPosts.loadingState === "failed" ? (
          <Button onPress={getPoolingPosts} title="Please try again!" />
        ) : (
          <>
            {allPoolingPosts.loadingState === "loaded" ? (
              allPoolingPosts.data.length > 0 ? (
                <DataGrid
                  items={getItemsForTable(allPoolingPosts.data)}
                  onRowPress={onRowPress}
                  firstColMinWidhtFifty
                  // onLayout={() => console.log(`Items ${items}`)}
                  columnsDef={[
                    { title: "Description", key: "description" },
                    { title: "Start Time", numeric: true, key: "startTime" },
                    {
                      title: "Share Per Person (£)",
                      key: "sharePp",
                      numeric: true,
                      numberOfLines: 2,
                    },
                  ]}
                  onScroll={onScroll}
                />
              ) : (
                <View>
                  <Text>No pooling posts yet.</Text>
                  <Text>
                    Submit one using the &apos;Post&apos; button on bottom-left
                    of the screen.
                  </Text>
                </View>
              )
            ) : (
              <ActivityIndicator />
            )}
          </>
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

        <Modal {...modalProps} />
        {/* <Modal
          visible={modalProps.visible}
          modalType={modalProps.modalType}
          componentOrMessage={modalProps.componentOrMessage}
          onClose={modalProps.onClose}
          heading={modalProps.heading}
        /> */}
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
    marginBottom: 10,
    marginTop: 10,
    width: "75%",
  },
  more: {
    marginVertical: 20,
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

export default CarPool;
