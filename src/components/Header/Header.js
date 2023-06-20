import React from 'react'

// Components
import Mobile from './Mobile'
import Desktop from './Desktop'

export default function Header() {
  return (
    <>
      <div className='on_mobile:hidden'>
        <Desktop />
      </div>
      <div className='on_desktop:hidden'>
        <Mobile />
      </div>
    </>
  )
}
