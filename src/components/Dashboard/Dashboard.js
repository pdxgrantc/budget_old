import React from 'react'
import { Helmet } from 'react-helmet'

// Firebase
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'

// Components
import SignIn from '../SignIn/SignIn'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export default function Dashboard() {
  const [user] = useAuthState(auth)

  if (!user) {
    return (
      <div className='w-screen min-h-screen text-small bg-bg text'>
        <Header />
        <SignIn />
        <Footer />
      </div>
    )
  } else {
    return (
      <div className='w-screen min-h-screen text-small bg-bg text'>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
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