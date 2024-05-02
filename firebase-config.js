import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore/lite";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDHOQ-QOma411j3UAm0QgLfMoCMzGwiC7k",
  authDomain: "bw-pool-baas.firebaseapp.com",
  projectId: "bw-pool-baas",
  storageBucket: "bw-pool-baas.appspot.com",
  messagingSenderId: "515835263431",
  appId: "1:515835263431:web:a7b422dd015de79d6401e2",
  measurementId: "G-ZY15H6EHGT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
