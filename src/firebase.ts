// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzMwZ-GMx4_I61E-7UthdnegPVU7mceb0",
  authDomain: "metube-e843b.firebaseapp.com",
  projectId: "metube-e843b",
  storageBucket: "metube-e843b.appspot.com",
  messagingSenderId: "515570276131",
  appId: "1:515570276131:web:d343d5b1d3a20037a79e96",
  measurementId: "G-1VQ3VJSFY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(); 
export default app;
export const provider = new GoogleAuthProvider();