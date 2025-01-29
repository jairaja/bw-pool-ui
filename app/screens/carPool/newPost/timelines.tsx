import React, { useEffect, useRef } from "react";
import LabeledChoiceButtons from "@/app/common/components/labeledChoiceButtons";
import { GetChildButtons } from "@/app/common/components/choiceButtons/choiceButtons";

import { ROUTE_INFO } from "@/config";
import { RiderOwner, TodTom } from "@/app/common/models/basic";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import LabeledDateTimePicker from "@/app/common/components/labeledDateTimePicker";
import {
  FromDateToDisplayTime,
  GetTodTomDate,
  UpdateTodTomDate,
  IsTimeUpdated,
} from "@/app/common/utils/dateTimeHelper";

type FromAndWhenPropType = {
  forRiderOrOwner: RiderOwner;
  startingFrom?: string;
  startingWhen?: Date;
  onChange: (key: string, value: string | number | Date) => void;
};

const Timelines = function ({
  forRiderOrOwner,
  startingFrom,
  startingWhen,
  onChange,
}: FromAndWhenPropType) {
  const routeInfoRef = useRef<string[]>([]);

  const updateTime = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      onChange("startingWhen", date);
    }
  };

  function getTime(time: Date | undefined) {
    if (IsTimeUpdated(time)) {
      return time!;
    } else if (time) {
      const defaultTime = new Date();
      // Update date on default time, as the selected date might be different than today
      return new Date(defaultTime.setDate(time.getDate()));
    }
    return new Date();
  }

  function getDisplayTime(time: Date | undefined): string | undefined {
    if (IsTimeUpdated(time)) {
      return FromDateToDisplayTime(time!);
    }
  }

  function getTodTom(date?: Date) {
    if (date) {
      return date.getDate() === new Date().getDate() ? "Today" : "Tomorrow";
    }
    return "";
  }

  function resetTime() {
    onChange("startingWhen", new Date(startingWhen!.setHours(0, 0, 0, 0)));
  }

  function setTodTom(day: TodTom, date?: Date) {
    if (date) {
      onChange("startingWhen", UpdateTodTomDate(day, date));
    } else {
      onChange("startingWhen", GetTodTomDate(day, true) as Date);
    }
  }

  useEffect(() => {
    if (Array.isArray(ROUTE_INFO)) {
      ROUTE_INFO.forEach((route) => {
        routeInfoRef.current.push(route);
      });
    }
  }, []);

  return (
    <>
      <LabeledChoiceButtons
        label="From:   "
        value={startingFrom ?? ""}
        mode="inline"
        onValueChange={(value) => {
          onChange("startingFrom", value);
        }}
        buttons={GetChildButtons(routeInfoRef.current)}
        multiSelect={false}
      />

      <LabeledChoiceButtons
        label="When:   "
        value={getTodTom(startingWhen)}
        mode="inline"
        onValueChange={(value) => {
          setTodTom(value as TodTom, startingWhen);
        }}
        buttons={GetChildButtons(["Today", "Tomorrow"])}
        multiSelect={false}
      />

      <LabeledDateTimePicker
        label={forRiderOrOwner === "Rider" ? "Preferred Time: " : "Time:   "}
        labelLaunchButton={getDisplayTime(startingWhen) ?? "Show Time Picker"}
        mode="time"
        resetTime={resetTime}
        disabled={!startingWhen}
        onChange={updateTime}
        value={getTime(startingWhen)}
      />
    </>
  );
};

export default Timelines;
