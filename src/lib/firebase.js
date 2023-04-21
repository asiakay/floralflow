// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
//import { isSupported, getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqFWuG1thl8FFlWXlKXMdXgHAU5qv1Jog",
  authDomain: "floralflow.firebaseapp.com",
  databaseURL: "https://floralflow-default-rtdb.firebaseio.com",
  projectId: "floralflow",
  storageBucket: "floralflow.appspot.com",
  messagingSenderId: "732693957760",
  appId: "1:732693957760:web:e97da5a9c5568e47cbaa65"
};

/* if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
} */



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
//const analytics = getAnalytics(app);

/* // Initialize Analytics only if it's supported
if (typeof window !== 'undefined' && isSupported()) {
  getAnalytics(firebaseApp);
} */

export { auth, db };
