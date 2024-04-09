import React, { useEffect, useRef } from "react";
import LabeledChoiceButtons from "@/app/common/components/labeledChoiceButtons";
import { View } from "@/app/common/components/themed";
import { ROUTE_INFO, TOD_TOM } from "@/config";
import { KeyValue } from "@/app/common/models/types";
import { StyleSheet } from "react-native";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import LabeledDateTimePicker from "@/app/common/components/labeledDateTimePicker";
import { FromTimeNumberToDisplayTime } from "@/app/common/utils/dateTimeHelper";

type FromAndWhenPropType = {
  from?: string;
  whenDay?: string;
  whenTime?: number;
  onChange: (key: string, value: string | number) => void;
};

const Timelines = function ({
  from,
  whenDay,
  whenTime,
  onChange,
}: FromAndWhenPropType) {
  const routeInfo = useRef<KeyValue[]>([]);
  const dayInfo = useRef<KeyValue[]>([]);

  const updateTime = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      onChange("whenTime", date.getTime());
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
    onChange("from", routeInfo.current[0].key);
    onChange("whenDay", dayInfo.current[0].key);
  }, []);

  return (
    <View>
      <View style={styles.marginAmongComponents}>
        <LabeledChoiceButtons
          label="From:   "
          value={from ?? ""}
          mode="inline"
          onValueChange={(value) => {
            onChange("from", value);
          }}
          buttons={[
            {
              value: routeInfo.current[0]?.key as string,
              label: routeInfo.current[0]?.value,
              showSelectedCheck: true,
            },
            {
              value: routeInfo.current[1]?.key as string,
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
          value={whenDay ?? ""}
          mode="inline"
          onValueChange={(value) => {
            onChange("whenDay", value);
          }}
          buttons={[
            {
              value: dayInfo.current[0]?.key as string,
              label: dayInfo.current[0]?.value,
              showSelectedCheck: true,
            },
            {
              value: dayInfo.current[1]?.key as string,
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
          labelLaunchButton={
            whenTime
              ? FromTimeNumberToDisplayTime(whenTime)
              : "Show Time Picker"
          }
          mode="time"
          onChange={updateTime}
          value={whenTime ? new Date(whenTime) : new Date()}
        />
      </View>
    </View>
  );
};

export default Timelines;

const styles = StyleSheet.create({
  marginAmongComponents: { marginBottom: 20 },
});
