// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgO5edxai6CXkgH3SvPBZRoGZLAcGWquo",
  authDomain: "student-engagement-signature.firebaseapp.com",
  databaseURL:
    "https://student-engagement-signature-default-rtdb.firebaseio.com",
  projectId: "student-engagement-signature",
  storageBucket: "student-engagement-signature.appspot.com",
  messagingSenderId: "670337534641",
  appId: "1:670337534641:web:28b01121c13cc5a372f090",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
