// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZbgl1dDbp3yFw0Kv6LMjrwiSxv_qPh4c",
  authDomain: "equestrian-app-e534c.firebaseapp.com",
  databaseURL: "https://equestrian-app-e534c-default-rtdb.firebaseio.com",
  projectId: "equestrian-app-e534c",
  storageBucket: "equestrian-app-e534c.appspot.com",
  messagingSenderId: "654284899256",
  appId: "1:654284899256:web:65590cb25e16ac2240854d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage(app);
