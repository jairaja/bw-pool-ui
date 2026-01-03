import LabeledDropDownPicker from "@/app/common/components/labeledDropDownPicker";
import { View } from "@/app/common/components/themed";
import { Resource, RiderOwner } from "@/app/common/models/basic";
import { db } from "@/firebase-config";
import { collection, getDocs } from "@firebase/firestore";
import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { ItemType, ValueType } from "react-native-dropdown-picker";

type LocationsPropsType = {
  onChange: (key: string, value: string | string[]) => void;
  destination?: string;
  startingPoint?: string;
  pickupPoints: string[];
  dropPoints: string[];
  forRiderOrOwner: RiderOwner;
};

const Locations = ({
  onChange,
  startingPoint,
  pickupPoints,
  dropPoints,
  destination,
  forRiderOrOwner,
}: LocationsPropsType) => {
  // Need this state due to a bug in Picker with multiple values. OnChange event is not fired if local state is not set
  // On selection change is fired. But it will take away the functionality of removing selected items in a closed picker
  // In closed picker, on removing items, on change will be fired only if 'setValue' of the picker has setstate function
  // Same for DropPoints Picker

  const [pickupPointsState, setPickupPointsState] =
    useState<ValueType[]>(pickupPoints);
  const [dropPointsState, setDropPointsState] =
    useState<ValueType[]>(dropPoints);
  const [startingPointState, setstartingPointState] =
    useState<ValueType | null>(startingPoint ?? null);
  const [destinationState, setDestinationState] = useState<ValueType | null>(
    destination ?? null
  );

  const [locations, setLocations] = useState<
    Resource<Record<string, string>[]>
  >({ loadingState: "not-loaded" });

  const [startingPointDropDownOpen, setStartingPointDropDownOpen] =
    useState(false);
  const [pickupPointsDropDownOpen, setPickupPointsDropDownOpen] =
    useState(false);
  const [dropPointsDropDownOpen, setDropPointsDropDownOpen] = useState(false);
  const [destinationDropDownOpen, setDestinationDropDownOpen] = useState(false);

  const GetAllLocations = async () => {
    const docRef = collection(db, "locations");
    const docSnap = await getDocs(docRef);
    return docSnap;
  };

  useEffect(() => {
    const getLocationsData = async function () {
      // TODO - seprate lists for starting point and pickup points....and drop points and destination
      // These lists to check for source and destination in "From" field
      try {
        setLocations({ loadingState: "loading" });

        const allLocations = await GetAllLocations();
        const allLocationsData = allLocations.docs.map(
          (doc) => doc.data() as Record<"value", "label">
        );
        setLocations({ loadingState: "loaded", data: allLocationsData });
      } catch (error) {
        setLocations({ loadingState: "failed", errorMessage: error as string });
      }
    };
    getLocationsData();
  }, []);

  return (
    <>
      {locations.loadingState !== "loaded" ? (
        <ActivityIndicator />
      ) : (
        <View>
          {forRiderOrOwner === "Owner" && (
            <LabeledDropDownPicker
              label="Starting Point: "
              open={startingPointDropDownOpen}
              setOpen={setStartingPointDropDownOpen}
              value={startingPointState}
              items={locations.data}
              setValue={setstartingPointState}
              onSelectItem={(item) => {
                onChange("startingPoint", item.value as string);
              }}
              multiple={false}
              placeholder="Select your starting point"
            />
          )}
          <LabeledDropDownPicker
            label={
              forRiderOrOwner === "Owner"
                ? "Pickup Points: "
                : "Preferred Pickup Points: "
            }
            open={pickupPointsDropDownOpen}
            setOpen={setPickupPointsDropDownOpen}
            value={pickupPointsState}
            // value={pickupPointsState as ValueType[]}
            items={locations.data}
            setValue={setPickupPointsState}
            min={0}
            max={5}
            onSelectItem={(newValues: ItemType<ValueType>[]) => {
              if (newValues.length <= 5) {
                onChange(
                  "pickupPoints",
                  newValues.map((newValue) => newValue.value) as string[]
                );
              }
            }}
            // onChangeValue={(newValues) => {
            //   onChange("pickupPoints", newValues as string[]);
            // }}
            placeholder="Select upto 5"
            multiple
            mode="BADGE"
          />
          <LabeledDropDownPicker
            label={
              forRiderOrOwner === "Owner"
                ? "Drop Points: "
                : "Preferred Drop Points: "
            }
            open={dropPointsDropDownOpen}
            setOpen={setDropPointsDropDownOpen}
            value={dropPointsState}
            // value={dropPointsState as ValueType[]}
            items={locations.data}
            setValue={setDropPointsState}
            min={0}
            max={5}
            onSelectItem={(newValues: ItemType<ValueType>[]) => {
              if (newValues.length <= 5) {
                onChange(
                  "dropPoints",
                  newValues.map((newValue) => newValue.value) as string[]
                );
              }
            }}
            // onChangeValue={(newValues) => {
            //   onChange("dropPoints", newValues as string[]);
            // }}
            placeholder="Select upto 5"
            multiple
            mode="BADGE"
          />
          {forRiderOrOwner === "Owner" && (
            <LabeledDropDownPicker
              label="Destination: "
              open={destinationDropDownOpen}
              setOpen={setDestinationDropDownOpen}
              value={destinationState}
              setValue={setDestinationState}
              items={locations.data}
              onSelectItem={(item: ItemType<ValueType>) => {
                onChange("destination", item.value as string);
              }}
              multiple={false}
              placeholder="Select your destination"
            />
          )}
        </View>
      )}
    </>
  );
};

export default Locations;

// MOKI Test data:
//https://mocki.io/v1/5759a4f7-b5c7-460e-a78e-e23b7222e029
// [{"label":"Hatfield","value":"hatfield"},{"label":"Welham Green","value":"welhamGreen"},{"label":"Brookmans Park","value":"brookmansPark"},{"label":"Edgware","value":"edgware"},{"label":"Barnet","value":"barnet"},{"label":"Temp Value","value":"tempValue"},{"label":"Central London","value":"centralLondon"}]
