// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJCHYzFWfXtjnqZ908QttuR6o68D8xtkQ",
  authDomain: "zeecart-db.firebaseapp.com",
  projectId: "zeecart-db",
  storageBucket: "zeecart-db.appspot.com",
  messagingSenderId: "797918910020",
  appId: "1:797918910020:web:1816d10d9aab8aac06ce11",
  measurementId: "G-15EKVHYBPL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export const db = getFirestore(app); 
export { app, analytics, firestore, auth, storage };
export default firestore; // Default export for firestore