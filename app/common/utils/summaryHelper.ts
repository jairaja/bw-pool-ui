import { CarOwnerNewPostValuesType } from "@/app/screens/carPool/newPost/carOwnerNewPost";
import { RiderNewPostValuesType } from "@/app/screens/carPool/newPost/riderNewPost";
import { RiderOwner } from "../models/types";
import {
  FromDateToDisplayTime,
  GetDayAndDate,
  GetTodTomFromDate,
} from "./dateTimeHelper";
import { COMMUNICATION_MODE, CURRENCY_SYMBOL } from "@/config";

export type SummaryType = { riderOwner: RiderOwner } & (
  | RiderNewPostValuesType
  | CarOwnerNewPostValuesType
);

export function GetSummary({ riderOwner, ...post }: SummaryType) {
  return riderOwner === "Rider"
    ? `Seat Required - ${GetRiderPostSummary(post)}`
    : `Seats Available - ${GetCarOwnerPostSummary(post)}`;
}

export function GetRiderPostSummary(post: RiderNewPostValuesType) {
  let riderSummary = `from  ${post.startingFrom}.`;

  const todTom = GetTodTomFromDate(post.startingWhen) as string;
  const dayAndDate = GetDayAndDate(post.startingWhen, "\\");
  const displayTime = FromDateToDisplayTime(post.startingWhen);

  riderSummary += `\n${todTom} - ${dayAndDate} - around ${displayTime}.`;

  const pickupPoints =
    Array.isArray(post.pickupPoints) && post.pickupPoints.join(", ");
  riderSummary += `\n\nPreferred pickup points - ${pickupPoints}.`;

  const dropPoints =
    Array.isArray(post.dropPoints) && post.dropPoints.join(", ");
  riderSummary += `\nPreferred drop points - ${dropPoints}.`;
  if (
    post.pickupPoints &&
    Array.isArray(post.pickupPoints) &&
    post.pickupPoints.length > 0
  ) {
    const pickupPoints = post.pickupPoints.join(", ");
    riderSummary += `\n\nPreferred pickup points - ${pickupPoints}.`;
  }

  if (
    post.dropPoints &&
    Array.isArray(post.dropPoints) &&
    post.dropPoints.length > 0
  ) {
    const dropPoints = post.dropPoints.join(", ");
    riderSummary += `\nDrop points - ${dropPoints}.`;
  }

  if (post.bootspace) {
    riderSummary += `\n\nBootspace required`;
    if (post.luggage) {
      riderSummary +=
        post.luggage === "More"
          ? " - for a bag bigger than medium."
          : ` - for a ${post.luggage} size bag.`;
    } else {
      riderSummary += ".";
    }
  } else {
    riderSummary += `\n\nBootspace not required.`;
  }

  const commMode =
    post.communicationMode === COMMUNICATION_MODE[COMMUNICATION_MODE.length - 1]
      ? COMMUNICATION_MODE.slice(0, COMMUNICATION_MODE.length - 1).join(" or ")
      : post.communicationMode;

  riderSummary += `\nPreferred communication mode - ${commMode}.`;

  riderSummary += `\n\nPreferred Pool Share - ${CURRENCY_SYMBOL} ${post.poolShare}`;
  if (post.notes) {
    riderSummary += `\n\nAdditional Notes: ${post.notes}.`;
  }
  return riderSummary;
}

export function GetCarOwnerPostSummary(post: CarOwnerNewPostValuesType) {
  let ownerSummary = `from ${post.startingFrom}.`;

  const todTom = GetTodTomFromDate(post.startingWhen) as string;
  const dayAndDate = GetDayAndDate(post.startingWhen, "\\");
  const displayTime = FromDateToDisplayTime(post.startingWhen);

  ownerSummary += `\n${todTom} - ${dayAndDate} - at ${displayTime}.`;

  ownerSummary += `\n\nStarting from - ${post.startingPoint}.`;

  if (
    post.pickupPoints &&
    Array.isArray(post.pickupPoints) &&
    post.pickupPoints.length > 0
  ) {
    const pickupPoints = post.pickupPoints.join(", ");
    ownerSummary += `\nPickup points - ${pickupPoints}.`;
  }

  if (
    post.dropPoints &&
    Array.isArray(post.dropPoints) &&
    post.dropPoints.length > 0
  ) {
    const dropPoints = post.dropPoints.join(", ");
    ownerSummary += `\nDrop points - ${dropPoints}.`;
  }

  ownerSummary += `\nDestination - ${post.destination}.`;

  ownerSummary += `\n\nCar fuel type is ${post.fuelType}.`;

  if (post.refueling) {
    ownerSummary += ` Refueling on the way.`;
  } else {
    ownerSummary += ` No refueling on the way.`;
  }

  if (post.bootspace) {
    ownerSummary += `\nBootspace available`;
    if (post.luggage) {
      ownerSummary +=
        post.luggage === "More"
          ? " - for a bag bigger than medium."
          : ` - for a ${post.luggage} size bag.`;
    } else {
      ownerSummary += ".";
    }
  } else {
    ownerSummary += `\nBootspace not available.`;
  }

  const commMode =
    post.communicationMode === COMMUNICATION_MODE[COMMUNICATION_MODE.length - 1]
      ? COMMUNICATION_MODE.slice(0, COMMUNICATION_MODE.length - 1).join(" or ")
      : post.communicationMode;

  ownerSummary += `\n\nPreferred communication mode - ${commMode}.`;

  ownerSummary += `\n\nPool Share - ${CURRENCY_SYMBOL} ${post.poolShare}`;
  if (post.notes) {
    ownerSummary += `\n\nAdditional Notes: ${post.notes}.`;
  }
  return ownerSummary;
}
