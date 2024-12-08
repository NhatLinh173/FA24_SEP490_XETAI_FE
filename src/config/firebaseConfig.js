import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACnZvXtyBBH53JjHSENpwKrcqn_LFk2P8",
  authDomain: "fir-58e22.firebaseapp.com",
  projectId: "fir-58e22",
  storageBucket: "fir-58e22.appspot.com",
  messagingSenderId: "500150521284",
  appId: "1:500150521284:web:eab126813cb49fb8bf6891",
  measurementId: "G-MBB8SDKND4",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
