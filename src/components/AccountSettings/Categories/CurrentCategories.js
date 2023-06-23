import React, { useState, useEffect } from 'react'

// Firebase
import { doc, collection, getDocs, runTransaction, onSnapshot } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../../firebase'

// Components
import { FaRegTrashAlt as TrashIcon } from 'react-icons/fa'


export default function CurrentCategories() {
    const [user] = useAuthState(auth)
    const [userCategories, setUserCategories] = useState([])

    useEffect(() => {
        const unsubscribe = onSnapshot(
            doc(db, 'users', user.uid),
            (doc) => {
                setUserCategories(doc.data().transactionTypes);
            }
        );
        return () => {
            unsubscribe();
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

        // confirm deletion
        const confirmDelete = window.confirm(`Are you sure you want to delete the category "${category}"?`);
        if (!confirmDelete) {
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
        <div className='flex flex-col gap-3'>
            <h2 className="text-sheader font-semibold">Current Categories</h2>
            <div className='ml-3'>
                {userCategories !== null ? (
                    <>
                        {userCategories.map((category, index) => (
                            <div key={category} className='flex gap-3 flex-nowrap'>
                                <p>{index + 1}.</p>
                                <p>{category}</p>
                                <button onClick={() => handleDeleteCategory(category)} className=" ">
                                    <TrashIcon className='p-1 rounded-full h-[80%] w-full hover:text-black hover:bg-gray-200' />
                                </button>
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
