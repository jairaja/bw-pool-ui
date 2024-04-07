import { LocalTime } from "../models/types";

export function FromDateToTime(date: Date): LocalTime {
  return {
    key: date.getTime(),
    value: date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }),
  };
}

