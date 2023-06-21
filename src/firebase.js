import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword } from "firebase/auth";
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

export const signInWithEmailPassword = async (email, password) => {
    try {
        // Get the Firebase Auth instance
        const auth = getAuth();

        // Sign in with email and password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Return the user credential
        return userCredential.user;
    } catch (error) {
        // Handle any errors that occurred during sign-in
        throw new Error(error.message);
    }
};


export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
        // create users collection in firestore
        const userRef = doc(db, "users", result.user.uid);
        getDoc(userRef).then((docSnap) => {
            if (!docSnap.exists()) {
                setDoc(userRef, {
                    displayName: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                    uid: result.user.uid,
                    createdAt: new Date(),
                });
            }
        });
    }).catch((error) => {
        console.log(error);
    });
}

export const signOutUser = () => {
    signOut(auth);
}