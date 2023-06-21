import React from 'react'

import Desktop from './Desktop'
import Mobile from './Mobile'

export default function Header() {
    return (
        <div className='text-dark_grey'>
            <div className='on_mobile:hidden flex flex-col'>
                <Desktop />
                <div className='h-[2rem]'></div>
            </div>
            <div className='on_desktop:hidden'>
                <Mobile />
            </div>
        </div>
    )
}
