import React from 'react'

// Components
import CurrentCategories from './CurrentCategories'
import AddNewCategory from './AddNewCategory'

export default function Categories() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
                <CurrentCategories />
            </div>
            <div className="col-span-1">
                <AddNewCategory />
            </div>
        </div>
    )
}
