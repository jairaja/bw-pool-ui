import { CarOwnerNewPostValuesType } from "@/app/screens/carPool/newPost/carOwnerNewPost";
import { COMMUNICATION_MODE, FUEL_TYPE, ROUTE_INFO } from "@/config";

type OwnerRider = "Owner" | "Rider";

export type PoolingPostsFirebaseType = {
  fromTo: (typeof ROUTE_INFO)[number];
  destinationPoint: string;
  fuelType: (typeof FUEL_TYPE)[number];
  refueling: boolean;
  id?: string;
  communicationMode: (typeof COMMUNICATION_MODE)[number];
  startingWhen: number;
  startingPoint: string;
  notes: string;
  luggage: string;
  riderOwner: OwnerRider;
  pickupPoints: string[];
  poolShare: number;
  bootspace: boolean;
  dropPoints: string[];
};

export const getPoolingPostsFirebaseType = (
  post: Partial<CarOwnerNewPostValuesType>,
  riderOwner: OwnerRider,
): PoolingPostsFirebaseType => {
  console.log(
    "Post to be sent to firebase:",
    post.startingWhen?.getUTCSeconds(),
  );
  console.log(
    "Post to be sent to firebase:",
    post.startingWhen instanceof Date,
  );
  //   console.log("Post to be sent to firebase:", new Date(post.startingWhen!));
  //   console.log(
  //     "Post to be sent to firebase:",
  //     Date.parse(post.startingWhen!) / 1000,
  //   );
  return {
    fromTo: post.fromTo!,
    destinationPoint: post.destinationPoint!,
    fuelType: post.fuelType!,
    refueling: post.refueling ?? false,
    // id: post.id,
    communicationMode: post.communicationMode!,
    startingWhen: post.startingWhen!.getTime(),
    startingPoint: post.startingPoint!,
    notes: post.notes ?? "",
    luggage: post.luggage ?? "",
    riderOwner: riderOwner,
    pickupPoints: post.pickupPoints ?? [],
    poolShare: post.poolShare!,
    bootspace: post.bootspace ?? false,
    dropPoints: post.dropPoints ?? [],
  };
};
