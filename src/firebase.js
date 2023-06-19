import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAbgm1NnjRz_mLX4aaqR96iUV3AifBoqd8",
    authDomain: "budget-a4c79.firebaseapp.com",
    projectId: "budget-a4c79",
    storageBucket: "budget-a4c79.appspot.com",
    messagingSenderId: "334523129983",
    appId: "1:334523129983:web:a1b33a574144fbcd4cdf4a",
    measurementId: "G-H0595C6H5C"
  };

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    try {
        await axios.post(`/api/user/signin`, {
            uid: result.user.uid,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
            email: result.user.email,
        });
    }
    catch (error) {
        console.error(error);
    }
};

export const signOutUser = () => {
    signOut(auth);
}

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();