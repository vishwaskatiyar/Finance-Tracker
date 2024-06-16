import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXC7l4l9NBke0YoSiFdiIM41J7_vc1P9M",
    authDomain: "finance-tracker-4787e.firebaseapp.com",
    projectId: "finance-tracker-4787e",
    storageBucket: "finance-tracker-4787e.appspot.com",
    messagingSenderId: "1086201826689",
    appId: "1:1086201826689:web:bc00455c37066c10016c80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Configure Google Sign-In
const provider = new GoogleAuthProvider();

// Export the configured instances for use in other files
export { db, auth, provider, doc, setDoc };
