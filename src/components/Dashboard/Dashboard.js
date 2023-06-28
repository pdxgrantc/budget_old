import React from 'react'
import { Helmet } from 'react-helmet'

// Firebase
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'

// Components
import RecentSpending from './RecentSpending'
import RecentIncome from './RecentIncome'
import SignIn from '../SignIn/SignIn'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export default function Dashboard() {
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
          <title>Dashboard</title>
        </Helmet>
        <Header />
        <div className="mx-[5rem] flex flex-col gap-page_break">
          <div className='items-baseline h-fit bg-black py-[2rem] px-[4rem] rounded-main_box'>
            <p className='text-sheader font-thin mb-[-12px]'>Welcome</p>
            <h1 className='text-header font-semibold'>{user.displayName}</h1>
          </div>
          <div className='grid gap-10 grid-cols-2 bg-black py-[2rem] px-[4rem] rounded-main_box'>
            <div>
              <RecentSpending />
            </div>
            <div>
              <RecentIncome />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}