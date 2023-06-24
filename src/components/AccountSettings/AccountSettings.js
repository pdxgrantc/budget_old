import React from 'react'
import { Helmet } from 'react-helmet'

// Firebase
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'

// Components
import Categories from './Categories/Categories'
import IncomeSources from './IncomeSettings/IncomeSettings'
import SignIn from '../SignIn/SignIn'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export default function AccountSettings() {
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
        <Helmet>
          <title>Account Settings</title>
        </Helmet>
        <Header title={"Account Settings"} />
        <div className="mx-[5rem]">
          <div className='flex flex-col'>
            <div className='flex flex-col gap-[2rem]'>
              <div className='bg-black py-[2rem] px-[4rem] rounded-main_box'>
                <Categories />
              </div>
              <div className='bg-black py-[2rem] px-[4rem] rounded-main_box'>
              <IncomeSources />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}