import React from 'react'

// Firebase
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'

// Components
import SignIn from '../SignIn/SignIn'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export default function Home() {
  const [user] = useAuthState(auth)

  if (!user) {
    return (
      <div className='max-w-screen min-h-screen text-small bg-bg text'>
        <Header />
        <SignIn />
        <Footer />
      </div>
    )
  } else {
    return (
      <div className='max-w-screen min-h-screen text-small bg-bg text'>
        <Header />
        <div className="mx-[5rem] rounded bg-black py-[2rem] px-[4rem]">
          <div className='items-baseline h-fit'>
            <p className='text-sheader font-thin mb-[-12px]'>Welcome</p>
            <h1 className='text-lheader font-semibold'>{user.displayName}</h1>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
