import React, { useState, useEffect } from 'react'

// Firebase
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../../firebase'


export default function AddNewCategory() {
  const [user] = useAuthState(auth)
  const [userCategories, setUserCategories] = useState([])
  const [newCategory, setNewCategory] = useState('')

  useEffect(() => {
    const getUserDoc = async () => {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserCategories(docSnap.data().transactionTypes);
      }
      else {
        console.log('No such document!');
      }
    };

    if (user) {
      getUserDoc();
    }
  }, [user, user.uid]);

  const handleAddNewCategory = async () => {
    const userRef = doc(db, 'users', user.uid);
  
    // check if category already exists as any function of uppercase/lowercase
    const categoryExists = userCategories.some(category => category.toLowerCase() === newCategory.toLowerCase());
    if (categoryExists) {
      alert('Category already exists');
      return;
    }

    await updateDoc(userRef, {
      transactionTypes: arrayUnion(newCategory)
    });
  }


  return (
    <div>
      <h2 className="text-sheader font-semibold">Add New Category</h2>
      <div>
        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddNewCategory}>Add</button>
      </div>
    </div>
  )
}
