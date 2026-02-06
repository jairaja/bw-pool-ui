import { CarOwnerNewPostValuesType } from "@/app/screens/carPool/newPost/carOwnerNewPost";
import { COMMUNICATION_MODE, FUEL_TYPE, ROUTE_INFO } from "@/config";
import { RiderOwner } from "./basic";

export type PoolingPostsFirebaseType = {
  destinationPoint?: string;
  fuelType?: (typeof FUEL_TYPE)[number];
  refueling: boolean;
  id?: string;
  startingPoint?: string;
  fromTo: (typeof ROUTE_INFO)[number];
  pickupPoints: string[];
  dropPoints: string[];
  communicationMode: (typeof COMMUNICATION_MODE)[number];
  startingWhen: number;
  notes: string | null;
  luggage: string | null
  riderOwner: RiderOwner;
  poolShare: number;
  bootspace: boolean;
};

export const getPoolingPostsFirebaseType = (
  post: Partial<CarOwnerNewPostValuesType>,
): PoolingPostsFirebaseType => {
  let returnObj : Partial<PoolingPostsFirebaseType> = {
    // id: post.id,
    fromTo: post.fromTo!,
    communicationMode: post.communicationMode!,
    startingWhen: post.startingWhen!.getTime(),
    notes: post.notes ?? null,
    luggage: post.luggage ?? null,
    riderOwner: post.riderOwner!,
    poolShare: post.poolShare!,
    bootspace: post.bootspace ?? false,
  };

  if(post.riderOwner === "Owner") {
    returnObj = {
      ...returnObj,
      destinationPoint: post.destinationPoint!,
      startingPoint: post.startingPoint!,
      fuelType: post.fuelType!,
      refueling: post.refueling ?? false,
      pickupPoints: post.pickupPoints ?? [],
      dropPoints: post.dropPoints ?? [],
    };
  } else if (post.riderOwner === "Rider") {
    returnObj = {
      ...returnObj,
      pickupPoints: post.pickupPoints!,
      dropPoints: post.dropPoints!,
    };
  }

  return returnObj as PoolingPostsFirebaseType;
};
