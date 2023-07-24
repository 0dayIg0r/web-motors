import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA_KPyS4mwNTYJc5oIMu9lu4Zh20gWmBr4",
  authDomain: "clone-web-motors.firebaseapp.com",
  projectId: "clone-web-motors",
  storageBucket: "clone-web-motors.appspot.com",
  messagingSenderId: "779627420749",
  appId: "1:779627420749:web:9bbf259571103f96bd5004"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { db, auth, storage }


// continuar aula 78 aos 4min