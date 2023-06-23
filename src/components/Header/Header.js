import React, { useState, useEffect } from 'react'

import Desktop from './Desktop'
import Mobile from './Mobile'

export default function Header(props) {
    const [title, setTitle] = useState('EZ Budget')

    useEffect(() => {
        if (props.title) {
            setTitle(props.title)
        }
    }, [props.title])


    return (
        <div className='text-dark_grey'>
            <div className='on_mobile:hidden flex flex-col'>
                <Desktop title={title} />
                <div className='h-[2rem]'></div>
            </div>
            <div className='on_desktop:hidden'>
                <Mobile title={title} />
            </div>
        </div>
    )
}
