import React, { useState, useEffect } from 'react'

// Firebase
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../../firebase'

export default function AddNewSource() {
    const [user] = useAuthState(auth)
    const [userSources, setUserSources] = useState([])
    const [newSource, setNewSource] = useState('')

    useEffect(() => {
        const getUserDoc = async () => {
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUserSources(docSnap.data().incomeSources);
            }
            else {
                console.log('No such document!');
            }
        };

        if (user) {
            getUserDoc();
        }
    }, [user, user.uid]);

    const handleAddNewSource = async () => {
        const userRef = doc(db, 'users', user.uid);

        // check if source already exists as any function of uppercase/lowercase
        const sourceExists = userSources.some(source => source.toLowerCase() === newSource.toLowerCase());
        if (sourceExists) {
            alert('Source already exists');
            return;
        }

        await updateDoc(userRef, {
            incomeSources: arrayUnion(newSource)
        });

        setNewSource('');
    }

    return (
        <div className='flex flex-col gap-3'>
            <h2 className="text-sheader font-semibold">Add New Source</h2>
            <div className='flex gap-10 flex-nowrap'>
                <input
                    type="text"
                    id="New Source"
                    placeholder="New Source"
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value)}
                    className='outline-none rounded-md text-black px-2 py-[0.125rem] font-normal text-small h-auto'
                />
                <button
                    onClick={handleAddNewSource}
                    className='border-b-[2px] hover:bg-menu_button_hover hover:px-5 py-1 hover:rounded-button font-semibold transition-all duration-300 ease-cubic-bezier'>
                    Add Income Source
                </button>
            </div>
        </div>
    )
}
