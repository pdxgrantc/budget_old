import React, { useState } from 'react'

// Firebase
import { signInWithGoogle, signInWithEmailPassword } from '../../firebase'

// Components
import { FcGoogle as GoogleIcon } from 'react-icons/fc'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const usernamePasswordSignIn = () => {
        signInWithEmailPassword(email, password)
    }

    return (
        <div className='h-full w-full'>
            <div className='my-[3rem] mx-auto bg-black py-[2rem] px-[3.5rem] w-fit min-w-[45rem]'>
                <h1 className='text-lheader font-bold text-white'>Sign In</h1>
                <div>
                    <div>
                        <input className='w-full my-2 py-2 px-3 rounded bg-input_grey text-text' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input className='w-full my-2 py-2 px-3 rounded bg-input_grey text-text' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className='w-full my-2 py-2 px-3 rounded bg-button_grey text-text hover:bg-button_grey_hover transition' onClick={usernamePasswordSignIn}>Sign In</button>
                </div>
                <div className='font-semibold'>
                    <button className='text-white hover:text-text transition flex gap-5 bg-google_blue py-[.75rem] px-[1.25rem] hover:bg-button_grey_hover rounded' onClick={signInWithGoogle}>
                        <div className='my-auto p-2 bg-white rounded-full'>
                            <GoogleIcon className='' />
                        </div>
                        <h2>Google Sign In</h2>
                    </button>
                </div>
            </div>
        </div>
    )
}
