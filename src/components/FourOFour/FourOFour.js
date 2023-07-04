import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// Components
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export default function FourOFour() {
  return (
    <div className='max-w-screen min-h-screen text-small on_desktop:bg-bg on_mobile:bg-black text'>
      <Header />
      <Helmet>
        <title>404 | Page Not Found</title>
      </Helmet>
      <div className="on_desktop:mx-[5rem] on_mobile:mx-[1.75rem] rounded bg-black py-[2rem] px-[4rem]">
        <div className='items-baseline h-fit'>
          <div className='mx-auto w-fit py-20 flex flex-col gap-3'>
            <div>
              <h2 className='on_desktop:text-lheader on_mobile:text-sheader font-semibold on_mobile:whitespace-nowrap'>Oops...</h2>
              <h1 className='on_desktop:text-xlheader on_mobile:text-header font-bold on_mobile:whitespace-nowrap'>Error: 404</h1>
              <h2 className='on_desktop:text-lheader on_mobile:text-sheader font-semibold on_mobile:whitespace-nowrap'>Page Not Found</h2>
            </div>
            <div className=''>
              <Link to='/' className='text-normal border-b-[2px] on_desktop:hover:bg-menu_button_hover on_desktop:hover:px-5 py-1 on_desktop:hover:rounded-button font-semibold transition-all duration-300 ease-cubic-bezier'>Go Home</Link>
            </div>
          </div>
        </div>
      </div>
      <div className='on_mobile:hidden'>
        <Footer />
      </div>
    </div>
  )
}
