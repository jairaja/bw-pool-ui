import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// import firebase from 'firebase/app';
// import 'firebase/firestore';

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
export const db = getFirestore(app);
// export const auth = getAuth(app);

// export { db };
