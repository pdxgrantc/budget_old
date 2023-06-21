import React from 'react'

// Firebase
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, signOutUser } from '../../firebase'

export default function Desktop() {
    const [user] = useAuthState(auth)

    return (
        <div className='w-full min-h-[80px] bg-black flex'>
            <div className='w-[5rem]'></div>
            <div className='flex justify-between w-full'>
                <h1 className='align-middle text-lheader font-bold text-white'>EZ Budget</h1>
                {user ?
                    <button onClick={signOutUser}>
                        Sign Out
                    </button>
                    :
                    <></>
                }

            </div>
            <div className='w-[5rem]'></div>
        </div>
    )
}
