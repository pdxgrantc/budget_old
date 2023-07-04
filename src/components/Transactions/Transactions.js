import React from 'react'
import { Helmet } from 'react-helmet'

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
                    <title>Transactions</title>
                </Helmet>
                <Header title={"Transactions"} />
                <div className="on_desktop:mx-[5rem] on_mobile:mx-[1.75rem]">
                    <div className='flex flex-col'>
                        <div className='flex flex-col gap-[2rem]'>
                            <div className='bg-black on_desktop:py-[2rem] on_desktop:px-[4rem] rounded-main_box'>
                                <AddNewTransaction />
                            </div>
                            <div className='bg-black on_desktop:py-[2rem] on_desktop:px-[4rem] rounded-main_box'>
                                <PastTransactions />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
