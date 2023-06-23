import React from 'react'

// Components
import CurrentCategories from './CurrentCategories'
import AddNewCategory from './AddNewCategory'

export default function Categories() {
    return (
        <div className="flex gap-5 min-w-fit">
            <div className='w-[30%] min-w-fit'>
                <CurrentCategories />
            </div>
            <AddNewCategory />
        </div>
    )
}
