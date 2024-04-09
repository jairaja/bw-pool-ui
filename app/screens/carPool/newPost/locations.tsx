import LabeledDropDownPicker from "@/app/common/components/labeledDropDownPicker";
import { View } from "@/app/common/components/themed";
import React, { useState, useEffect } from "react";
import { ItemType, ValueType } from "react-native-dropdown-picker";

type LocationsPropsType = {
  onChange: (key: string, value: string | string[]) => void;
  destination?: string;
  startingPoint?: string;
  pickupPoints?: string[];
  dropPoints?: string[];
};

const Locations = ({
  onChange,
  startingPoint,
  pickupPoints,
  dropPoints,
  destination,
}: LocationsPropsType) => {
  const [pickupPointsState, setPickupPointsState] = useState(pickupPoints); //Need this state due to a bug in Picker with multiple values. Same for DropPOints Picker
  const [dropPointsState, setDropPointsState] = useState(dropPoints);
  const [items, setItems] = useState([]);
  const [startingPointDropDownOpen, setStartingPointDropDownOpen] =
    useState(false);
  const [pickupPointsDropDownOpen, setPickupPointsDropDownOpen] =
    useState(false);
  const [dropPointsDropDownOpen, setDropPointsDropDownOpen] = useState(false);
  const [destinationDropDownOpen, setDestinationDropDownOpen] = useState(false);

  useEffect(() => {
    const getData = async function () {
      const fetchData = await fetch(
        "https://mocki.io/v1/5759a4f7-b5c7-460e-a78e-e23b7222e029"
      );
      const response = await fetchData.json();
      // console.log(response);

      // const paarsedresponse = JSON.parse(response);
      // console.log(paarsedresponse);
      setItems(response);
    };
    getData();
  }, []);

  return (
    <View>
      <LabeledDropDownPicker
        label="Starting Point: "
        open={startingPointDropDownOpen}
        value={startingPoint}
        items={items}
        setOpen={setStartingPointDropDownOpen}
        onSelectItem={(item) => {
          onChange("startingPoint", item.value as string);
        }}
        multiple={false}
        placeholder="Select the starting point"
        zIndex={1000}
        // zIndexInverse={4000}
        elevation={1000}
      />
      <LabeledDropDownPicker
        label="Pickup Points: "
        open={pickupPointsDropDownOpen}
        value={pickupPointsState as ValueType[]}
        items={items}
        setOpen={setPickupPointsDropDownOpen}
        setValue={setPickupPointsState}
        min={0}
        max={5}
        // onSelectItem={(item) => {
        //   console.log("seelct item" + item);
        // }}
        // onChangeValue={(newValue) => {
        //   console.log("change" + newValue);
        //   onChange("pickupPoints", newValue as string[]);
        // }}
        placeholder="Select upto 5"
        multiple
        mode="BADGE"
        badgeDotColors={[
          "#e76f51",
          "#00b4d8",
          "#e9c46a",
          "#e76f51",
          "#8ac926",
          "#00b4d8",
          "#e9c46a",
        ]}
        zIndex={2000}
        zIndexInverse={3000}
      />
      <LabeledDropDownPicker
        label="Drop Points: "
        open={dropPointsDropDownOpen}
        value={dropPointsState as ValueType[]}
        items={items}
        setOpen={setDropPointsDropDownOpen}
        setValue={setDropPointsState}
        // onSelectItem={(items: ItemType<ValueType>[]) => {
        //   console.log(items);
        //   onChange(
        //     "dropPoints",
        //     items.map((item) => item.value as string)
        //   );
        // }}
        // onChangeValue={(value) => console.log(value)}
        min={0}
        max={5}
        placeholder="Select upto 5"
        multiple
        mode="BADGE"
        zIndex={3000}
        zIndexInverse={2000}
      />
      <LabeledDropDownPicker
        label="Destination: "
        open={destinationDropDownOpen}
        value={destination}
        items={items}
        onSelectItem={(item: ItemType<ValueType>) => {
          onChange("destination", item.value as string);
        }}
        setOpen={setDestinationDropDownOpen}
        multiple={false}
        placeholder="Select your last stop of the journey"
        zIndex={4000}
        zIndexInverse={1000}
      />
    </View>
  );
};

export default Locations;

// MOKI Test data:
//https://mocki.io/v1/5759a4f7-b5c7-460e-a78e-e23b7222e029
// [{"label":"Hatfield","value":"hatfield"},{"label":"Welham Green","value":"welhamGreen"},{"label":"Brookmans Park","value":"brookmansPark"},{"label":"Edgware","value":"edgware"},{"label":"Barnet","value":"barnet"},{"label":"Temp Value","value":"tempValue"},{"label":"Central London","value":"centralLondon"}]
