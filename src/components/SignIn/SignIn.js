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
            <div className='rounded-md my-[3rem] mx-auto bg-black py-[2rem] px-[3.5rem] w-fit min-w-[45rem] text-small'>
                <h1 className='text-lheader font-bold text-white'>Sign In</h1>
                <div>
                    <div>
                        <input className='text-black text-xsmall w-full my-2 py-2 px-3 rounded outline-none bg-input_grey' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input className='text-black text-xsmall w-full my-2 py-2 px-3 rounded outline-none bg-input_grey' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className='w-full my-2 py-2 px-3 rounded bg-button_grey text-text hover:bg-button_grey_hover transition' onClick={usernamePasswordSignIn}>Sign In</button>
                </div>
                <div className='font-semibold'>
                    <button className='mx-auto text-white hover:text-text transition flex gap-6 bg-google_blue py-[.75rem] px-[1.25rem] hover:bg-button_grey_hover rounded' onClick={signInWithGoogle}>
                        <div className='my-auto p-2 bg-white rounded-full'>
                            <GoogleIcon className='w-[1.5rem] h-auto' />
                        </div>
                        <h2 className='text-normal'>Sign In With Google</h2>
                    </button>
                </div>
            </div>
        </div>
    )
}
