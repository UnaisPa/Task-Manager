// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzTGHixl2AoFJH-lunu1DpY6PGkaVNe9g",
  authDomain: "task-manager-f607a.firebaseapp.com",
  projectId: "task-manager-f607a",
  storageBucket: "task-manager-f607a.firebasestorage.app",
  messagingSenderId: "863999928529",
  appId: "1:863999928529:web:bc8e4645b4855f8ce97df0",
  measurementId: "G-MTMZD7TRQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app 