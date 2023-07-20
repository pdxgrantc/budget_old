import React from 'react'

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <div>
            <div className='on_desktop:h-[4rem] on_mobile:h-[2rem]'></div>
            <div className='h-[50px] flex items-center justify-center bg-black py-[2.5rem] px-[3rem] rounded-main_box w-fit mx-auto'>
                <h3 className='text-center text-small'>Grant Conklin | {currentYear}</h3>
            </div>
            <div className='h-[4rem]'></div>
        </div>
    )
}
