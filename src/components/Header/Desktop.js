import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Firebase
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, signOutUser } from '../../firebase'

// Components
import { LuLogOut as LogoutIcon } from 'react-icons/lu'
import { MdOutlineManageAccounts as UserAccountIcon } from 'react-icons/md'

export default function Desktop(props) {
    const [user] = useAuthState(auth)
    const [title, setTitle] = useState('EZ Budget')

    useEffect(() => {
        if (props.title) {
            setTitle(props.title)
        }
    }, [props.title])


    return (
        <div className='w-full min-h-[80px] bg-black flex'>
            <div className='w-[5rem]'></div>
            <div className='flex justify-between w-full'>
                <Link to='/' >
                    <h1 className='align-middle text-lheader font-bold text'>{title}</h1>
                </Link>
                {user ?
                    <div className='flex'>
                        <Link to='/' className='flex gap-3 hover:bg-menu_button_hover h-fit px-3 py-2 my-auto rounded-button font-semibold'>
                            {window.location.pathname === '/' ? (
                                <>
                                    <p className='text-small text-white'>Dashboard</p>
                                </>
                            ) : (
                                <>
                                    <p className='text-small'>Dashboard</p>
                                </>
                            )}
                        </Link>
                        <Link to='/transactions' className='flex gap-3 hover:bg-menu_button_hover h-fit px-3 py-2 my-auto rounded-button font-semibold'>
                            {window.location.pathname === '/transactions' ? (
                                <>
                                    <p className='text-small text-white'>Transactions</p>
                                </>
                            ) : (
                                <>
                                    <p className='text-small'>Transactions</p>
                                </>
                            )}
                        </Link>
                        <Link to='/income' className='flex gap-3 hover:bg-menu_button_hover h-fit px-3 py-2 my-auto rounded-button font-semibold'>
                            {window.location.pathname === '/income' ? (
                                <>
                                    <p className='text-small text-white'>Income</p>
                                </>
                            ) : (
                                <>
                                    <p className='text-small'>Income</p>
                                </>
                            )}
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
            <li className='hover:bg-menu_button_hover rounded-button px-3 py-2'>
                <Link to={props.link} className="">
                    <p className='whitespace-nowrap text-small'>{props.text}</p>
                </Link>
            </li>
        );
    };

    return (
        <div className="relative flex flex-col" onMouseLeave={handleMouseLeave}>
            <button
                className="flex gap-3 hover:bg-menu_button_hover h-fit px-3 py-2 my-auto rounded-button font-semibold"
                onMouseEnter={handleMouseEnter}>
                <p>My Account</p>
                <UserAccountIcon className="my-auto" />
            </button>
            {isOpen && (
                <ul className='flex flex-col absolute z-10 rounded-md bg-menu_button' style={{ top: "100%", right: 0 }} onMouseLeave={handleMouseLeave} >
                    {/*<AccountMenuItem text="Budget Settings" link="/budget-settings" />*/}
                    <AccountMenuItem text="Account Settings" link="/account-settings" />
                    <button className='hover:bg-menu_button_hover rounded-button px-3 py-2 flex gap-3' onClick={signOutUser}>
                        <p className='text-small'>Sign Out</p>
                        <LogoutIcon className='my-auto' />
                    </button>
                </ul>
            )}
        </div>
    );
}
