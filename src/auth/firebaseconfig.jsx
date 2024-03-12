// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { signInWithPopup } from 'firebase/auth';
import { collection, doc, addDoc, updateDoc, deleteDoc, setDoc, getDocs} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-If9BKSObVwvnEtwREkJvcuQqyOi3nbw",
  authDomain: "safesend-9c803.firebaseapp.com",
  projectId: "safesend-9c803",
  storageBucket: "safesend-9c803.appspot.com",
  messagingSenderId: "449082398486",
  appId: "1:449082398486:web:ba86f1da46c1395fd1a237",
  measurementId: "G-6MLNEV5LDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleprovider = new GoogleAuthProvider();

export { auth, googleprovider, signInWithPopup};
export {db, doc, collection, addDoc, updateDoc, deleteDoc, setDoc, getDocs};