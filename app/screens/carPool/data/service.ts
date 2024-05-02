import { db } from "@/firebase-config";
import { collection, getDocs } from "firebase/firestore/lite";

//Temp
async function getCities() {
  const citiesCol = collection(db, "cities");
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}
