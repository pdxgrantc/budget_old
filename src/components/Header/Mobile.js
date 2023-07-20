import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Firebase
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, signOutUser } from '../../firebase'

// Components
import { LuLogOut as LogoutIcon } from 'react-icons/lu'
import { MdOutlineManageAccounts as UserAccountIcon } from 'react-icons/md'
import { GiHamburgerMenu as MenuIcon } from 'react-icons/gi'

export default function Mobile(props) {
  const [user] = useAuthState(auth)
  const [title, setTitle] = useState('EZ Budget')

  useEffect(() => {
    if (props.title) {
      setTitle(props.title)
    }
  }, [props.title])


  return (
    <div className='w-full min-h-[60px] bg-mobile_header_bg flex fixed'>
      <div className='w-[1.75rem]'></div>
      <div className='flex justify-between w-full'>
        <Link to='/' className='my-auto'>
          <h1 className='align-middle text-lheader font-bold text on_mobile:text my-auto h-fit'>{title}</h1>
        </Link>
        {user ?
          <AccountMenu />
          :
          <></>
        }
      </div>
      <div className='w-[1.5rem]'></div>
    </div>
  )
}


function AccountMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const AccountMenuItem = (props) => {
    return (
      <li className='rounded-button px-3 py-2 flex gap-3'>
        <Link to={props.link} className="w-full h-full">
          <p className='whitespace-nowrap text-small'>{props.text}</p>
        </Link>
        <div className='on_mobile:hidden'>{props.icon}</div>
      </li>
    );
  };

  return (
    <div className="relative flex flex-col">
      <button
        className="flex gap-3 h-fit px-3 py-2 my-auto rounded-button font-semibold"
        onClick={handleMenuToggle}>
        <p className='on_mobile:hidden'>My Account</p>
        <MenuIcon className="my-auto" />
      </button>
      {isOpen && (
        <ul className='flex flex-col absolute z-10 rounded-md bg-menu_button' style={{ top: "100%", right: 0 }} >
          <AccountMenuItem text="Dashboard" link="/" />
          <AccountMenuItem text="Income" link="/income" />
          <AccountMenuItem text="Spending" link="/transactions" />
          <AccountMenuItem text="Account Settings" link="/account-settings" icon={<UserAccountIcon className='my-auto' />} />
          <button className='rounded-button px-3 py-2 flex gap-3' onClick={signOutUser}>
            <p className='text-small'>Sign Out</p>
            <LogoutIcon className='my-auto' />
          </button>
        </ul>
      )}
    </div>
  );
}
