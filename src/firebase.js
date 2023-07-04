import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAbgm1NnjRz_mLX4aaqR96iUV3AifBoqd8",
    authDomain: "budget-a4c79.firebaseapp.com",
    projectId: "budget-a4c79",
    storageBucket: "budget-a4c79.appspot.com",
    messagingSenderId: "334523129983",
    appId: "1:334523129983:web:a1b33a574144fbcd4cdf4a",
    measurementId: "G-H0595C6H5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const signInWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const db = getFirestore();
        const userRef = doc(db, 'users', result.user.uid);
        const userDocSnap = await getDoc(userRef);

        if (!userDocSnap.exists()) {
            await setDoc(userRef, {
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                uid: result.user.uid,
                currentBalance: 0,
                spendingTypes: ['Groceries', 'Restaurants', 'Household Supplies', 'Rent', 'Bills', 'Repairs and Maintenance', 'Entertainment'],
                incomeSources: ['Paycheck', 'Investments', 'Other'],
                createdAt: new Date(),
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export const signOutUser = () => {
    signOut(auth);
}