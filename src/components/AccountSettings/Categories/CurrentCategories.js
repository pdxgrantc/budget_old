import React, { useState, useEffect } from 'react'

// Firebase
import { doc, getDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../../firebase'


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

    return (
        <div>
            <h2 className="text-header font-semibold">Current Categories</h2>
            <div>
                {userCategories !== null ? (
                    <>
                        {userCategories.map((category, index) => (
                            <div key={category} className='flex gap-3 flex-nowrap'>
                                <p>{index + 1}.</p>
                                <p>{category}</p>
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
