import React from 'react'

// Components
import IncomeSouces from './IncomeSources'
import AddNewSource from './AddNewSource'

export default function IncomeSettings() {
    return (
        <div className="flex gap-20 min-w-fit">
            <div className='w-[28%] min-w-fit'>
                <IncomeSouces />
            </div>
            <AddNewSource />
        </div>
    )
}