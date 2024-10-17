// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0CBd0StXcYC7te7g0LrcdKGTSim5vLPo",
  authDomain: "mern-auth-7db71.firebaseapp.com",
  projectId: "mern-auth-7db71",
  storageBucket: "mern-auth-7db71.appspot.com",
  messagingSenderId: "564906871241",
  appId: "1:564906871241:web:37bce32830c71c497cc018"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);