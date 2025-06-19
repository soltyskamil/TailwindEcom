import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore, getDocs } from "firebase/firestore";
// Konfiguracja Firebase - wstaw swoje klucze
const firebaseConfig = {
  apiKey: "AIzaSyCisqR0jnHP-tjXOA5Gj95mwqAqX77t03A",
  authDomain: "projekt-studia-fbcf9.firebaseapp.com",
  projectId: "projekt-studia-fbcf9",
  storageBucket: "projekt-studia-fbcf9.firebasestorage.app",
  messagingSenderId: "85775945254",
  appId: "1:85775945254:web:be9db0dc184c7bc76ea0e7",
  measurementId: "G-TQ36C3BPV9",
};

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

export const auth = getAuth(app);

// const colRef = collection(db, "users");

// getDocs(colRef).then((snapshot) => {
//   console.log(snapshot);
// });
