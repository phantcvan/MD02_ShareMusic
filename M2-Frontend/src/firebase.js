// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDEJM3-PKqpPAzNXVJ1bQ6pC7ZJDtPee_E",
    authDomain: "ss11-514db.firebaseapp.com",
    projectId: "ss11-514db",
    storageBucket: "ss11-514db.appspot.com",
    messagingSenderId: "303955462172",
    appId: "1:303955462172:web:998d9c84a7070e19fd37d9",
    measurementId: "G-QZC5Q0LPCH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);