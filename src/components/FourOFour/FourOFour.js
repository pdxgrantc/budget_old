import React from 'react'
import { Helmet } from 'react-helmet'

// Components
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export default function FourOFour() {
  return (
    <div className='max-w-screen min-h-screen text-small bg-bg text'>
      <Header />
      <Helmet>
        <title>404 | Page Not Found</title>
      </Helmet>
      <div className="mx-[5rem] rounded bg-black py-[2rem] px-[4rem]">
        <div className='items-baseline h-fit'>
          <div className='mx-auto w-fit py-20'>
            <h1 className='text-xlheader font-bold'>Error: 404</h1>
            <h2 className='text-lheader font-semibold'>Page Not Found</h2>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
