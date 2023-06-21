import React from 'react'

export default function Footer() {
    // get current year
    const year = new Date().getFullYear();

    return (
        <div className='h-[50px] flex items-center justify-center'>
            <h3 className='text-center text-small'>Grant Conklin | {year}</h3>
        </div>
    )
}
