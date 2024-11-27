import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase details
const firebaseConfig = {
  apiKey: "AIzaSyB-d-5Y6CZhLXBepm_34x_cemLNQi0yxdA",
  authDomain: "webappmovielab.firebaseapp.com",
  projectId: "webappmovielab",
  storageBucket: "webappmovielab.firebasestorage.app",
  messagingSenderId: "150748452163",
  appId: "1:150748452163:web:4f922bc625904fc3268bf6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

export { auth };
