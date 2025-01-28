import { db } from "@/firebase-config";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { getDoc, collection, getDocs } from "firebase/firestore";

const PoolingPostsDB = "poolingPosts";

export default async function GetAllPoolingPosts() {
  const docRef = collection(db, PoolingPostsDB);
  const docSnap = await getDocs(docRef);

  // console.log("******");
  // console.log(docSnap.docs);
  // docSnap.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });

  return docSnap;
  // const docRef = doc(db, "poolingPosts", "YXDGUBulZ33huc6f2H43");

  // const data = await db.collection("poolingPosts").get();
  // const data = await getDocs(collection(db, "poolingPosts"));

  // console.log(JSON.parse(`${docSnap.data()}`));
}

// async function name(params: type) {}

// export { GetAllPoolingPosts };
