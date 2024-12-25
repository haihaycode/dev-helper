import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { VueFire, VueFireAuth } from "vuefire";

const firebaseConfig = {
  apiKey: "AIzaSyA1mKlF83B1EoKsyWhlMjz0GgpRUi8HM6I",
  authDomain: "dev-helper-c4874.firebaseapp.com",
  databaseURL: "https://dev-helper-c4874-default-rtdb.firebaseio.com",
  projectId: "dev-helper-c4874",
  storageBucket: "dev-helper-c4874.firebasestorage.app",
  messagingSenderId: "936267761026",
  appId: "1:936267761026:web:5061e0d0de572183b27b9b",
  measurementId: "G-N06F0C383Z",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const database = getDatabase(app);
const firestore = getFirestore(app);

export {
  auth,
  googleProvider,
  githubProvider,
  database,
  firestore,
  VueFire,
  VueFireAuth,
};
