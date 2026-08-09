import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC1Wf_WRdYAQ3EqVPhQ-Pk1wF_l92NMi5c",
  authDomain: "mehwar-digital-library.firebaseapp.com",
  projectId: "mehwar-digital-library",
  storageBucket: "mehwar-digital-library.firebasestorage.app",
  messagingSenderId: "48815874020",
  appId: "1:48815874020:web:18ae1ce52aceaf5f8171f1"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;