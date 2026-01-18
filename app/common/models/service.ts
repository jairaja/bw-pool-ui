import { CarOwnerNewPostValuesType } from "@/app/screens/carPool/newPost/carOwnerNewPost";
import { COMMUNICATION_MODE, FUEL_TYPE, ROUTE_INFO } from "@/config";

type OwnerRider = "Owner" | "Rider";

export type PoolingPostsFirebaseType = {
    fromTo: (typeof ROUTE_INFO)[number];
    destination: string;
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

export const getPoolingPostsFirebaseType = (post: Partial<CarOwnerNewPostValuesType>, riderOwner:OwnerRider): PoolingPostsFirebaseType => {
    // return {
    //     fromTo: post.fromTo!,
    //     destination: post.destination!, 
}