import { TodTom } from "../models/types";

const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function FromDateToDisplayTime(
  date: Date | undefined
): string | undefined {
  if (date instanceof Date) {
    let hours = date.getHours();
    let minutes: number | string = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours} : ${minutes}  ${ampm}`;
  }
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
  const returnDate = new Date(date);
  if (day === "Today") {
    returnDate.setDate(new Date().getDate());
  } else if (day === "Tomorrow") {
    returnDate.setDate(new Date().getDate() + 1);
  }
  return returnDate;
}

export function IsTimeUpdated(time: Date | undefined) {
  return time && time.toTimeString().substring(0, 8) !== "00:00:00";
}

export function GetTodTomFromDate(date: Date | undefined): TodTom | undefined {
  if (date instanceof Date) {
    const todayDate = new Date().getDate();
    const tomorrowDate = new Date(new Date().setDate(todayDate + 1)).getDate();

    if (todayDate === date.getDate()) {
      return "Today";
    } else if (tomorrowDate === date.getDate()) {
      return "Tomorrow";
    }
  }
}

export function GetDayAndDate(date: Date | undefined, separator?: string) {
  if (date instanceof Date) {
    const day = dayNames[date.getDay()];
    const calculatedDate = date.getDate().toString().padStart(2, "0");
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const calculatedSeparator = separator ?? "-";

    return `${day}, ${calculatedDate}${calculatedSeparator}${month}${calculatedSeparator}${year}`;
  }
}
