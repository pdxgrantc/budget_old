import React from 'react'

export default function Footer() {
    // get current year
    const year = new Date().getFullYear();

    return (
        <div>
            <div className='h-[4rem]'></div>
            <div className='h-[50px] flex items-center justify-center bg-black py-[2.5rem] px-[3rem] rounded-main_box w-fit mx-auto'>
                <h3 className='text-center text-small'>Grant Conklin | {year}</h3>
            </div>
            <div className='h-[4rem]'></div>
        </div>
    )
}
