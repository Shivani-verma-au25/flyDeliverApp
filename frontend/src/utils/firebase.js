// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "flydeliveryapp-b7332.firebaseapp.com",
  projectId: "flydeliveryapp-b7332",
  storageBucket: "flydeliveryapp-b7332.firebasestorage.app",
  messagingSenderId: "872087119247",
  appId: "1:872087119247:web:8d5d7c88c6655e443d57fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {app,auth};