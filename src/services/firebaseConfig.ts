
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut  } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject  } from "firebase/storage";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth()
const storage = getStorage(app);
//Exports of Authentication
export {auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut }

//Exports of storage
export { storage, ref, uploadBytes, getDownloadURL, deleteObject }

//Exports of Firestore
export { db, collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc }