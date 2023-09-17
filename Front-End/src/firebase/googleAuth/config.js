// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmG3-Dwd39uKJHbiekQv_UMAZZHNXkhhM",
  authDomain: "xctacine.firebaseapp.com",
  projectId: "xctacine",
  storageBucket: "xctacine.appspot.com",
  messagingSenderId: "761015990267",
  appId: "1:761015990267:web:47141a59040d131a7abd5e",
  measurementId: "G-ZQCN6FYWS9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
const googleProvider =new GoogleAuthProvider()

export {auth,googleProvider,app}