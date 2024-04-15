import { TodTom } from "../models/types";

export function FromDateToDisplayTime(date: Date): string {
  let hours = date.getHours();
  let minutes: number | string = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours} : ${minutes}  ${ampm}`;
}

export function FromTimeNumberToDisplayTime(time?: number): string | void {
  if (time) {
    return FromDateToDisplayTime(new Date(time));
  }
}

export function GetTodTomDate(
  day: TodTom,
  resetToMidnight?: boolean
): Date | undefined {
  const date = resetToMidnight
    ? new Date(new Date().setHours(0, 0, 0, 0))
    : new Date();
  if (day === "Today") {
    return date;
  } else if (day === "Tomorrow") {
    const tomorrow = date;
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }
}
export function UpdateTodTomDate(day: TodTom, date: Date): Date {
  if (day === "Today") {
    date.setDate(new Date().getDate());
  } else if (day === "Tomorrow") {
    date.setDate(new Date().getDate() + 1);
  }
  return date;
}

export function IsTimeUpdated(time: Date | undefined) {
  return time && time.toTimeString().substring(0, 8) !== "00:00:00";
}
