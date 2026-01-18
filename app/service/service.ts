import { db } from "@/firebase-config";
import {
  doc,
  setDoc,
  addDoc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
// import { getFirestore, collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
// import { getDoc, collection, getDocs } from "firebase/firestore";

// Example: Generic Firestore service
export const FirestoreService = {
  async getAll(collectionName: string) {
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async add(collectionName: string, data: any) {
    const colRef = collection(db, collectionName);
    const docRef = await addDoc(colRef, data);
    return docRef.id;
  },

  async set(collectionName: string, id: string, data: any) {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, data);
  },
};

// const PoolingPostsDB = "poolingPosts";

// export default async function GetAllPoolingPosts() {
//   const docRef = collection(db, PoolingPostsDB);
//   const docSnap = await getDocs(docRef);

// console.log("******");
// console.log(docSnap.docs);
// docSnap.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });

// return docSnap;
// const docRef = doc(db, "poolingPosts", "YXDGUBulZ33huc6f2H43");

// const data = await db.collection("poolingPosts").get();
// const data = await getDocs(collection(db, "poolingPosts"));

// console.log(JSON.parse(`${docSnap.data()}`));
// }

// async function name(params: type) {}

// export { GetAllPoolingPosts };
