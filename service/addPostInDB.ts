import { db } from "@/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { CarOwnerNewPostValuesType } from "../app/screens/carPool/newPost/carOwnerNewPost";

const PoolingPostsDB = "poolingPosts";

// Function to add a new document to Firestore
export const addNewPost = async (
  newPost: Partial<CarOwnerNewPostValuesType>
) => {
  try {
    const postRef = await addDoc(collection(db, PoolingPostsDB), newPost);
    console.log("Document successfully added with ID: ", postRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// Example usage
const handleAdd = async () => {
  const newPost = {
    startingFrom: "Starting Point",
    startingWhen: new Date(),
    startingPoint: "Point A",
    fuelType: "Petrol",
    destination: "Destination B",
    communicationMode: "Phone",
    // Add other fields as necessary
  };

  await addNewPost(newPost);
};
