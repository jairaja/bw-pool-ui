// FILE: dateTimeHelper.test.ts

import {
  FromDateToDisplayTime,
  FromTimeNumberToDisplayTime,
  GetTodTomDate,
  UpdateTodTomDate,
  IsTimeUpdated,
  GetTodTomFromDate,
  GetDayAndDate,
} from "../dateTimeHelper";
import { TodTom } from "../../models/basic";

describe("dateTimeHelper", () => {
  test("FromDateToDisplayTime should format date correctly", () => {
    const date = new Date("2023-10-10T14:30:00");
    expect(FromDateToDisplayTime(date)).toBe("2 : 30  pm");
  });

  test("FromTimeNumberToDisplayTime should format time number correctly", () => {
    const time = new Date("2023-10-10T14:30:00").getTime();
    expect(FromTimeNumberToDisplayTime(time)).toBe("2 : 30  pm");
  });

  test("GetTodTomDate should return today's date", () => {
    const today = new Date();
    expect(GetTodTomDate("Today")).toEqual(today);
  });

  test("GetTodTomDate should return tomorrow's date", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(GetTodTomDate("Tomorrow")).toEqual(tomorrow);
  });

  test("UpdateTodTomDate should update date to today", () => {
    const date = new Date("2023-10-10T14:30:00");
    const updatedDate = new Date(date);
    updatedDate.setDate(new Date().getDate());
    expect(UpdateTodTomDate("Today", date)).toEqual(updatedDate);
  });

  test("UpdateTodTomDate should update date to tomorrow", () => {
    const date = new Date("2023-10-10T14:30:00");
    const updatedDate = new Date(date);
    updatedDate.setDate(new Date().getDate() + 1);
    expect(UpdateTodTomDate("Tomorrow", date)).toEqual(updatedDate);
  });

  test("IsTimeUpdated should return true if time is not midnight", () => {
    const date = new Date("2023-10-10T14:30:00");
    expect(IsTimeUpdated(date)).toBe(true);
  });

  test("IsTimeUpdated should return false if time is midnight", () => {
    const date = new Date("2023-10-10T00:00:00");
    expect(IsTimeUpdated(date)).toBe(false);
  });

  test("GetTodTomFromDate should return Today for today's date", () => {
    const today = new Date();
    expect(GetTodTomFromDate(today)).toBe("Today");
  });

  test("GetTodTomFromDate should return Tomorrow for tomorrow's date", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(GetTodTomFromDate(tomorrow)).toBe("Tomorrow");
  });

  test("GetDayAndDate should format date correctly", () => {
    const date = new Date("2023-10-10T14:30:00");
    expect(GetDayAndDate(date)).toBe("Tues, 10-Oct-2023");
  });

  test("GetDayAndDate should format date correctly with custom separator", () => {
    const date = new Date("2023-10-10T14:30:00");
    expect(GetDayAndDate(date, "/")).toBe("Tues, 10/Oct/2023");
  });
});
