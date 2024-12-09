import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-0Ll1cHeX7yOL4vvUL1lcRARjJg_pnUg",
  authDomain: "send-otp-f10ec.firebaseapp.com",
  projectId: "send-otp-f10ec",
  storageBucket: "send-otp-f10ec.firebasestorage.app",
  messagingSenderId: "1047384258671",
  appId: "1:1047384258671:web:8940b21de3efb189b1759a",
  measurementId: "G-WR1BC3NXEE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
