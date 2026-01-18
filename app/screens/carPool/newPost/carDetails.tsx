import { GetChildButtons } from "@/app/common/components/choiceButtons/choiceButtons";
import LabeledChoiceButtons from "@/app/common/components/labeledChoiceButtons";
import LabeledSlider from "@/app/common/components/labeledSlider";
import LabeledSwitch from "@/app/common/components/labeledSwitch";
import { RiderOwner } from "@/app/common/models/basic";

import { CURRENCY_SYMBOL, FUEL_TYPE, SHARE_PER_SEAT } from "@/config";
import React, { useEffect, useRef, useState } from "react";

type CarDetailsPropsTypes = {
  forRiderOrOwner: RiderOwner;
  onChange: (key: string, value: string | number | boolean) => void;
  fuelType?: string;
  refueling?: boolean;
  bootspace?: boolean;
  luggage?: string;
  poolShare?: number;
};

export default function CarDetails({
  forRiderOrOwner,
  refueling,
  poolShare,
  fuelType,
  luggage,
  bootspace,
  onChange,
}: CarDetailsPropsTypes) {
  const fuelTypeButtonsRef = useRef<string[]>([]);
  const poolShareRef = useRef<number[]>([]);

  const [refuelingSwitchDisable, setRefuelingSwitchDisable] = useState(false);

  useEffect(() => {
    if (Array.isArray(FUEL_TYPE)) {
      fuelTypeButtonsRef.current = [...FUEL_TYPE];
    }
    if (Array.isArray(SHARE_PER_SEAT)) {
      poolShareRef.current = [...SHARE_PER_SEAT];
      onChange("poolShare", poolShareRef.current[0]);
    }
  }, []);

  function updateCarFuelType(newValue: string) {
    if (newValue === "Electric") {
      onChange("refueling", false);
      setRefuelingSwitchDisable(true);
    } else {
      setRefuelingSwitchDisable(false);
    }

    onChange("fuelType", newValue);
  }

  return (
    <>
      {forRiderOrOwner === "Owner" && (
        <LabeledChoiceButtons
          label="Car fuel type:   "
          value={fuelType ?? ""}
          mode="block"
          nullable
          onValueChange={function (newValue: string) {
            updateCarFuelType(newValue);
          }}
          buttons={GetChildButtons(fuelTypeButtonsRef.current)}
          multiSelect={false}
        />
      )}
      {forRiderOrOwner === "Owner" && (
        <LabeledSwitch
          label="Refueling on the way: "
          value={refueling}
          disabled={refuelingSwitchDisable}
          onValueChange={(newValue: boolean) => {
            onChange("refueling", newValue);
          }}
        />
      )}
      <LabeledSwitch
        label={
          forRiderOrOwner === "Owner"
            ? "Bootspace available: "
            : "Bootspace required: "
        }
        value={bootspace}
        onValueChange={(newValue: boolean) => {
          onChange("bootspace", newValue);
          if (!newValue) {
            onChange("luggage", "");
          }
        }}
      />
      <LabeledChoiceButtons
        label={`Space ${
          forRiderOrOwner === "Owner" ? "available" : "required"
        } for (optional):`}
        value={luggage ?? ""}
        mode="block"
        nullable
        disabled={!bootspace}
        onValueChange={(value) => {
          onChange("luggage", value);
        }}
        buttons={GetChildButtons(["Small Bag", "Medium Bag", "More"])}
        multiSelect={false}
      />
      <LabeledSlider
        //Just for fun
        label={`${
          forRiderOrOwner === "Owner" ? "P" : "Preferred p"
        }ool share per rider: `}
        minimumValue={poolShareRef.current[0]}
        maximumValue={poolShareRef.current[poolShareRef.current.length - 1]}
        value={poolShare}
        step={5}
        displayValue={`${CURRENCY_SYMBOL ?? ""} ${poolShare}`}
        onValueChange={(newValue) => onChange("poolShare", newValue)}
      />
    </>
  );
}
