import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBOB6UWV91gJgFuvndIo3j4d9NV0t_AmzA",
//   authDomain: "demoremcare.firebaseapp.com",
//   projectId: "demoremcare",
//   storageBucket: "demoremcare.appspot.com",
//   messagingSenderId: "1033574347436",
//   appId: "1:1033574347436:web:4d0f129266b9e770b72509",
//   measurementId: "G-BBWBN62QEE"
// };
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