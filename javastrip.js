// Example: Save to Firestore
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore();

async function saveToFirebase(name, email, message) {
  try {
    await addDoc(collection(db, "contacts"), {
      name,
      email,
      message,
      createdAt: new Date()
    });
    alert("Message sent successfully!");
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Something went wrong!");
  }
}
// Initialize Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyXXX...",
  authDomain: "pasiya-md.firebaseapp.com",
  projectId: "pasiya-md",
  storageBucket: "pasiya-md.appspot.com",
  messagingSenderId: "XXXXXXX",
  appId: "1:XXXXXX:web:XXXXXX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
