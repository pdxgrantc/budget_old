import React from 'react'

// Components
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export default function Home() {
  return (
    <div className='w-screen min-h-screen text-base bg-bg text-text'>
      <Header />
      <div>Home</div>
      <Footer />
    </div>
  )
}
