import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCoVWiRR4xvxmiM3vLFsWvRvJtEUni5gWk",
  authDomain: "fir-demo-72534.firebaseapp.com",
  projectId: "fir-demo-72534",
  storageBucket: "fir-demo-72534.appspot.com",
  messagingSenderId: "953737563031",
  appId: "1:953737563031:web:a900f35135b0e9cf4ed2d2",
  measurementId: "G-7YY8RHMC1V",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
