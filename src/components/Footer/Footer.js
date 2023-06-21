import React from 'react'

export default function Footer() {
    // get current year
    const year = new Date().getFullYear();

    return (
        <div className='h-[50px] flex items-center justify-center'>
            <div className='h-[2rem]'></div>
            <h3 className='text-center text-small'>Grant Conklin | {year}</h3>
        </div>
    )
}
