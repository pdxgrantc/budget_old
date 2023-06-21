import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// Firebase
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, signOutUser } from '../../firebase'

// Components
import { LuLogOut as LogoutIcon } from 'react-icons/lu'
import { MdOutlineManageAccounts as UserAccountIcon } from 'react-icons/md'

export default function Desktop() {
    const [user] = useAuthState(auth)

    return (
        <div className='w-full min-h-[80px] bg-black flex'>
            <div className='w-[5rem]'></div>
            <div className='flex justify-between w-full'>
                <h1 className='align-middle text-lheader font-bold text-white'>EZ Budget</h1>
                {user ?
                    <div className='flex'>
                        <Link to='/dashboard' className='my-auto'>
                            <p className='text-xsmall text-white'>Dashboard</p>
                        </Link>
                        <AccountMenu />
                    </div>
                    :
                    <></>
                }

            </div>
            <div className='w-[3rem]'></div>
        </div>
    )
}


function AccountMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    const AccountMenuItem = (props) => {
        return (
            <li className='hover:bg-gray-600 rounded px-3 py-2'>
                <Link to={props.link} className="">
                    <p className='whitespace-nowrap text-xsmall'>{props.text}</p>
                </Link>
            </li>
        );
    };

    return (
        <div className="relative flex flex-col" onMouseLeave={handleMouseLeave}>
            <button
                className="flex gap-3 hover:bg-menu_button_hover h-fit px-3 py-2 my-auto rounded font-semibold"
                onMouseEnter={handleMouseEnter}>
                <p>Account</p>
                <UserAccountIcon className="my-auto" />
            </button>
            {isOpen && (
                <ul className='flex flex-col absolute z-10 rounded-md bg-menu_button' style={{ top: "100%", right: 0 }} onMouseLeave={handleMouseLeave} >
                    <AccountMenuItem text="Account Settings" link="/account" />
                    <button className='hover:bg-gray-600 rounded px-3 py-2 flex gap-3' onClick={signOutUser}>
                        <p className='text-xsmall'>Sign Out</p>
                        <LogoutIcon className='my-auto' />
                    </button>
                </ul>
            )}
        </div>
    );
}

function DropdownMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    const AccountMenuItem = (props) => {
        return (
            <li className='hover:bg-gray-600 rounded px-3 py-2'>
                <Link to={props.link} className="">
                    <p className='whitespace-nowrap text-xsmall'>{props.text}</p>
                </Link>
            </li>
        );
    };

    return (
        <div className="relative flex flex-col" onMouseLeave={handleMouseLeave}>
            <button
                className="flex gap-3 hover:bg-menu_button_hover h-fit px-3 py-2 my-auto rounded font-semibold"
                onMouseEnter={handleMouseEnter}>
                <p>Account</p>
                <UserAccountIcon className="my-auto" />
            </button>
            {isOpen && (
                <ul className='flex flex-col absolute z-10 rounded-md bg-menu_button' style={{ top: "100%", right: 0 }} onMouseLeave={handleMouseLeave} >
                    <AccountMenuItem text="Accounts" link="/account" />
                    <button className='hover:bg-gray-600 rounded px-3 py-2 flex gap-3' onClick={signOutUser}>
                        <p className='text-xsmall'>Sign Out</p>
                        <LogoutIcon className='my-auto' />
                    </button>
                </ul>
            )}
        </div>
    );
}

