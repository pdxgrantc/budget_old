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
      <div className='w-screen min-h-screen text-small bg-bg text-text'>
        <Header />
        <SignIn />
        <Footer />
      </div>
    )
  } else {
    return (
      <div className='w-screen min-h-screen text-small bg-bg text-text'>
        <Header />
        Home
        <Footer />
      </div>
    )
  }
}
