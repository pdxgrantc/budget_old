import React, { useState, useEffect } from 'react'

// Firebase
import { doc, getDocs, onSnapshot } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../../firebase'

// Components
import { FaRegTrashAlt as TrashIcon } from 'react-icons/fa'

export default function IncomeSources() {
    const [user] = useAuthState(auth)
    const [incomeSources, setIncomeSources] = useState([])

    useEffect(() => {
        const unsubscribe = onSnapshot(
            doc(db, 'users', user.uid),
            (doc) => {
                setIncomeSources(doc.data().incomeSources
                );
            }
        );
        return () => {
            unsubscribe();
        }
    }, [user, user.uid]);

    const handleDeleteIncomeSource = async (incomeSource) => {
        const userRef = doc(db, 'users', user.uid);

        // confirm deletion
        const confirmDelete = window.confirm(`Are you sure you want to delete the income source "${incomeSource}"?`);
        if (!confirmDelete) {
            return;
        }

        // remove income source from user's incomeSources array without using a transaction
        const docCache = await getDocs(userRef);
        const incomeSources = docCache.data().incomeSources;
        const newIncomeSources = incomeSources.filter((incomeSourceItem) => incomeSourceItem !== incomeSource);
        await userRef.update({ incomeSources: newIncomeSources });
    };


    return (
        <div className='flex flex-col gap-3'>
            <h2 className="text-sheader font-semibold">Current Income Sources</h2>
            <div className='ml-3'>
                {incomeSources !== null ? (
                    incomeSources.map((incomeSource, index) => (
                        <div key={incomeSource} className='flex items-center gap-2'>
                            <p>{index + 1}.</p>
                            <p>{incomeSource}</p>
                            <button onClick={() => handleDeleteIncomeSource(incomeSource)} className=" ">
                                <TrashIcon className='p-1 rounded-full h-[80%] w-full hover:text-black hover:bg-gray-200' />
                            </button>
                        </div>
                    ))
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}
