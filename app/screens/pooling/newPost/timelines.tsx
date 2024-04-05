import React, { useState, useEffect, useRef } from "react";
import LabeledChoiceButtons from "@/app/common/components/labeledChoiceButtons";
import { View } from "@/app/common/components/themed";
import { ROUTE_INFO, TOD_TOM } from "@/config";
import { keyValue } from "@/app/common/models/types";

type FromAndWhenType = {
  from: string;
  whenDay: string;
  whenTime: string;
};

const Timelines = function () {
  const routeInfo = useRef<keyValue[]>([]);
  const dayInfo = useRef<keyValue[]>([]);

  const [fromAndWhen, setFromAndWhen] = useState<FromAndWhenType>({
    from: "",
    whenDay: "",
    whenTime: "",
  });

  useEffect(() => {
    if (Array.isArray(ROUTE_INFO)) {
      ROUTE_INFO.forEach((route) => {
        routeInfo.current.push({ key: route.key, value: route.value });
      });
    }
    if (Array.isArray(TOD_TOM)) {
      TOD_TOM.forEach((day) => {
        dayInfo.current.push({ key: day.key, value: day.value });
      });
    }
    setFromAndWhen({
      ...fromAndWhen,
      from: routeInfo.current[0].key,
      whenDay: dayInfo.current[0].key,
    });
  }, []);

  const updateTimelines = function (key: string, value: string): void {
    setFromAndWhen({
      ...fromAndWhen,
      [key]: value,
    });
  };

  return (
    <View>
      <LabeledChoiceButtons
        label="From: "
        value={fromAndWhen.from ?? ""}
        mode="inline"
        onValueChange={(value) => {
          updateTimelines("from", value);
        }}
        buttons={[
          {
            value: routeInfo.current[0]?.key,
            label: routeInfo.current[0]?.value,
            showSelectedCheck: true,
          },
          {
            value: routeInfo.current[1]?.key,
            label: routeInfo.current[1]?.value,
            showSelectedCheck: true,
          },
        ]}
        multiSelect={false}
      />
    </View>
  );
};

export default Timelines;
