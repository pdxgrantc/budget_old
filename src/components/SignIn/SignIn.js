import React from 'react'

// Firebase
import { signInWithGoogle } from '../../firebase'

// Images
import google_normal from './btn_google_signin_dark_normal_web@2x.png'
import google_pressed from './btn_google_signin_dark_pressed_web@2x.png'

export default function SignIn() {

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
            <div className='flex flex-col gap-3 rounded-md my-[3rem] mx-auto bg-black py-[2rem] px-[3.5rem] w-fit text-small'>
                <h1 className='text-lheader font-bold text-white'>Sign In</h1>
                <div className='flex flex-col gap-8'>
                    <div className='font-semibold mx-auto'>
                        <GoogleButton />
                    </div>
                </div>
            </div>
        </div>
    )
}
