import React, { useState } from 'react'

// Firebase
import { signInWithGoogle, signInWithEmailPassword } from '../../firebase'

// Images
import google_normal from './btn_google_signin_dark_normal_web@2x.png'
import google_pressed from './btn_google_signin_dark_pressed_web@2x.png'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const usernamePasswordSignIn = () => {
        signInWithEmailPassword(email, password)
    }

    const GoogleButton = () => {
        const handleMouseEnter = (event) => {
            // Change the source of the image to the second image
            event.target.src = google_pressed;
        };

        const handleMouseLeave = (event) => {
            // Change the source of the image back to the first image
            event.target.src = google_normal;
        };

        return (
            <button className='mx-auto transition rounded' onClick={signInWithGoogle}>
                <img
                    src={google_normal}
                    alt="Button"
                    className='h-[5rem]'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                />
            </button>
        );
    };

    return (
        <div className='h-full w-full'>
            <div className='flex flex-col gap-5 rounded-md my-[3rem] mx-auto bg-black py-[2rem] px-[3.5rem] w-fit text-small'>
                <h1 className='text-lheader font-bold text-white'>Sign In</h1>
                <div className='flex flex-col gap-8'>
                    {/*
                    <div className='flex flex-col gap-[1.15rem]'>
                        <div className='flex flex-col gap-[.65rem]'>
                            <input className='text-black text-xsmall w-full py-2 px-3 rounded outline-none bg-input_grey' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input className='text-black text-xsmall w-full py-2 px-3 rounded outline-none bg-input_grey' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                        </div>
                        <button className='w-full py-2 px-3 rounded bg-button_grey text-text hover:bg-button_grey_hover transition' onClick={usernamePasswordSignIn}>Sign In</button>
                    </div>
                    */}
                    <div className='font-semibold mx-auto'>
                        <GoogleButton />
                    </div>
                </div>
            </div>
        </div>
    )
}
