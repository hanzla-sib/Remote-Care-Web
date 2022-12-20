import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9xrqrK4dCbFCXcguslKZWLH-V-tKE8SU",
  authDomain: "remotecare-e1d52.firebaseapp.com",
  databaseURL: "https://remotecare-e1d52-default-rtdb.firebaseio.com",
  projectId: "remotecare-e1d52",
  storageBucket: "remotecare-e1d52.appspot.com",
  messagingSenderId: "554139659809",
  appId: "1:554139659809:web:3212f20d616ac0259fbd60",
  measurementId: "G-NJ65KVL97J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth =getAuth(app);