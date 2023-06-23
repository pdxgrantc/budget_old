import React, { useState, useEffect } from 'react'

// Firebase
import { doc, getDoc, collection, getDocs, runTransaction } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../../firebase'

// Components
import { FaRegTrashAlt as TrashIcon } from 'react-icons/fa'


export default function CurrentCategories() {
    const [user] = useAuthState(auth)
    const [userCategories, setUserCategories] = useState([])

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

    const handleDeleteCategory = async (category) => {
        const userRef = doc(db, 'users', user.uid);
        const transactionRef = collection(userRef, 'transactions');
        const transactionSnapshot = await getDocs(transactionRef);
        const transactions = transactionSnapshot.docs.map((doc) => doc.data());
        const categoryInUse = transactions.some((transaction) => transaction.category === category);

        if (categoryInUse) {
            alert('Cannot delete category because it is in use by a transaction.');
            return;
        }

        // remove category from user's transactionTypes array
        await runTransaction(db, async (transaction) => {
            const doc = await transaction.get(userRef);
            const newTransactionTypes = doc.data().transactionTypes.filter((transactionType) => transactionType !== category);
            transaction.update(userRef, { transactionTypes: newTransactionTypes });
        });
    };


    return (
        <div>
            <h2 className="text-sheader font-semibold">Current Categories</h2>
            <div className='ml-3'>
                {userCategories !== null ? (
                    <>
                        {userCategories.map((category, index) => (
                            <div key={category} className='flex gap-3 flex-nowrap'>
                                <p>{index + 1}.</p>
                                <p>{category}</p>
                                <button onClick={() => handleDeleteCategory(category)}><TrashIcon /></button>
                            </div>
                        ))}
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}
