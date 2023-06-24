import React from 'react'

// Components
import { FaRegTrashAlt as TrashIcon } from 'react-icons/fa'


export default function DeleteButton() {
    return (
        <div>
            <TrashIcon className='text-button_grey hover:text-white'/>
        </div>
    )
}
