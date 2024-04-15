import React, { useEffect, useRef } from "react";
import LabeledChoiceButtons from "@/app/common/components/labeledChoiceButtons";
import { GetChildButtons } from "@/app/common/components/choiceButtons/choiceButtons";

import { ROUTE_INFO } from "@/config";
import { RiderOwner, TodTom } from "@/app/common/models/types";
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
  from?: string;
  when?: Date;
  onChange: (key: string, value: string | number | Date) => void;
};

const Timelines = function ({
  forRiderOrOwner,
  from,
  when,
  onChange,
}: FromAndWhenPropType) {
  const routeInfoRef = useRef<string[]>([]);

  const updateTime = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      onChange("when", date);
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
    onChange("when", new Date(when!.setHours(0, 0, 0, 0)));
  }

  function setTodTom(day: TodTom, date?: Date) {
    if (date) {
      onChange("when", UpdateTodTomDate(day, date));
    } else {
      onChange("when", GetTodTomDate(day, true) as Date);
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
        value={from ?? ""}
        mode="inline"
        onValueChange={(value) => {
          onChange("from", value);
        }}
        buttons={GetChildButtons(routeInfoRef.current)}
        multiSelect={false}
      />

      <LabeledChoiceButtons
        label="When:   "
        value={getTodTom(when)}
        mode="inline"
        onValueChange={(value) => {
          setTodTom(value as TodTom, when);
        }}
        buttons={GetChildButtons(["Today", "Tomorrow"])}
        multiSelect={false}
      />

      <LabeledDateTimePicker
        label={forRiderOrOwner === "Rider" ? "Preferred Time: " : "Time:   "}
        labelLaunchButton={getDisplayTime(when) ?? "Show Time Picker"}
        mode="time"
        resetTime={resetTime}
        disabled={!when}
        onChange={updateTime}
        value={getTime(when)}
      />
    </>
  );
};

export default Timelines;
