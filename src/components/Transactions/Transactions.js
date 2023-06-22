import React from 'react'

// Firebase
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'

// Components
import AddNewTransaction from './AddNewTransaction'
import PastTransactions from './PastTransactions'
import SignIn from '../SignIn/SignIn'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export default function Transactions() {
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
                <Header />
                <div className="mx-[5rem] rounded bg-black py-[2rem] px-[4rem]">
                    <div className='flex flex-col'>
                        <div className='items-baseline h-fit'>
                            <h1 className='text-lheader font-semibold'>Your Transactions</h1>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <AddNewTransaction />
                            <PastTransactions />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}