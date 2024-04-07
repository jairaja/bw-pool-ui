import React, { useState, useEffect, useRef } from "react";
import LabeledChoiceButtons from "@/app/common/components/labeledChoiceButtons";
import { View } from "@/app/common/components/themed";
import { ROUTE_INFO, TOD_TOM } from "@/config";
import { KeyValue, LocalTime } from "@/app/common/models/types";
import { StyleSheet } from "react-native";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import LabeledDateTimePicker from "@/app/common/components/labeledDateTimePicker";
import { FromDateToTime } from "@/app/common/utils/dateTimeHelper";

type FromAndWhenType = {
  from: string;
  whenDay: string;
  whenTime?: LocalTime;
};

const Timelines = function () {
  const routeInfo = useRef<KeyValue[]>([]);
  const dayInfo = useRef<KeyValue[]>([]);

  const [fromAndWhen, setFromAndWhen] = useState<FromAndWhenType>({
    from: "",
    whenDay: "",
    whenTime: undefined,
  });

  const updateTime = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      updateTimelines("whenTime", FromDateToTime(date));
    }
  };

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

  const updateTimelines = function (
    key: string,
    value: string | KeyValue
  ): void {
    setFromAndWhen({
      ...fromAndWhen,
      [key]: value,
    });
  };

  return (
    <View>
      <View style={styles.marginAmongComponents}>
        <LabeledChoiceButtons
          label="From:   "
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

      <View style={styles.marginAmongComponents}>
        <LabeledChoiceButtons
          label="When:   "
          value={fromAndWhen.whenDay ?? ""}
          mode="inline"
          onValueChange={(value) => {
            updateTimelines("whenDay", value);
          }}
          buttons={[
            {
              value: dayInfo.current[0]?.key,
              label: dayInfo.current[0]?.value,
              showSelectedCheck: true,
            },
            {
              value: dayInfo.current[1]?.key,
              label: dayInfo.current[1]?.value,
              showSelectedCheck: true,
            },
          ]}
          multiSelect={false}
        />
      </View>
      <View style={styles.marginAmongComponents}>
        <LabeledDateTimePicker
          label="Time:   "
          labelLaunchButton={fromAndWhen.whenTime ?? "Show Time Picker"}
          mode="time"
          onChange={updateTime}
          value={
            fromAndWhen.whenTime
              ? new Date(fromAndWhen.whenTime.key)
              : new Date()
          }
        />
      </View>
    </View>
  );
};

export default Timelines;

const styles = StyleSheet.create({
  marginAmongComponents: { marginBottom: 20 },
});
