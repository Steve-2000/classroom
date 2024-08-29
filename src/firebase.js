import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7xYi2298lB3oWSXCuygP9G_r8fpRvsf0",
  authDomain: "reactproject0-f3aaf.firebaseapp.com",
  projectId: "reactproject0-f3aaf",
  storageBucket: "reactproject0-f3aaf.appspot.com",
  messagingSenderId: "723314250792",
  appId: "1:723314250792:web:57a00becd8f996b22a111d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
