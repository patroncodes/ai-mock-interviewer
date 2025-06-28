import { initializeApp, getApps, getApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyClPVd8QP1aBLCoNe-e8viCYcPbAaQ-hok",
    authDomain: "prepwise-3d07a.firebaseapp.com",
    projectId: "prepwise-3d07a",
    storageBucket: "prepwise-3d07a.firebasestorage.app",
    messagingSenderId: "172495411470",
    appId: "1:172495411470:web:b120bf2805e70e0bc31f5f",
    measurementId: "G-FBDHTLWTQT"
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app);
export const db = getFirestore(app);

