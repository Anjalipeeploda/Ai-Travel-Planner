// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ai-travel-planner-58162.firebaseapp.com",
  projectId: "ai-travel-planner-58162",
  storageBucket: "ai-travel-planner-58162.firebasestorage.app",
  messagingSenderId: "243128938455",
  appId: "1:243128938455:web:b092332e4ddb9a5330a592",
  measurementId: "G-NFP552FHCY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
