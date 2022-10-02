// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvzXdVhy-TogVrhJTca4ThVV74vO-wPq4",
  authDomain: "spaceapps-art.firebaseapp.com",
  projectId: "spaceapps-art",
  storageBucket: "spaceapps-art.appspot.com",
  messagingSenderId: "200792587311",
  appId: "1:200792587311:web:54f26a868f53e65ee6dada",
  measurementId: "G-606Q5KT9J8"
};

// Initialize Firebase
export const FireApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(FireApp);
export const FireDB = getFirestore(FireApp)
