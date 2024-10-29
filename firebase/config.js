// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsJZslGLzv7qfea7eVS25s1qOpX1NpQoY",
  authDomain: "app-rifas-7902f.firebaseapp.com",
  projectId: "app-rifas-7902f",
  storageBucket: "app-rifas-7902f.appspot.com",
  messagingSenderId: "205489753983",
  appId: "1:205489753983:web:07e29165faa233a885144a",
};

// Inicializar la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app)

export { app, db, auth, storage, firebaseConfig };
