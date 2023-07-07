import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'

// Firebase
import { doc, getDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'

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
      <div className='max-w-screen min-h-screen text-small on_desktop:bg-bg on_mobile:bg-black text'>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        <Header />
        <div className="on_desktop:mx-[5rem] on_mobile:mx-[1.75rem] flex flex-col gap-page_break">
          <div className='on_mobile:hidden items-baseline h-fit bg-black py-[2rem] px-[4rem] rounded-main_box flex '>
            <div>
              <p className='text-sheader font-thin mb-[-12px]'>Welcome</p>
              <h1 className='text-header font-semibold'>{user.displayName}</h1>
            </div>
          </div>
          <div className='on_desktop:bg-black on_desktop:py-[2rem] on_desktop:px-[4rem] on_desktop:rounded-main_box'>
            <diV>
              <CurrentBalance />
            </diV>
            <div className='grid gap-10 on_desktop:grid-cols-2'>
              <div className=''>
                <RecentSpending />
              </div>
              <div className=''>
                <RecentIncome />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

function CurrentBalance() {
  const [user] = useAuthState(auth)
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setBalance(docSnap.data().currentBalance)
      }
    }

    fetchData()
  }, [user])

  return (
    <div className='flex gap-3'>
      <h2 className='on_desktop:text-large on_mobile:text-normal font-semibold'>
        Current Balance:
      </h2>
      <div className='on_desktop:text-normal on_mobile:text-small font-semibold'>
        {balance < 0 ?
          <p>-${balance * -1}</p>
          :
          <p>${balance}</p>
        }
      </div>
    </div>
  )
}
