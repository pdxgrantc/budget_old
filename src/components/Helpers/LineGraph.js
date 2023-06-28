import React, { useState, useEffect } from 'react'

export default function LineGraph(props) {
    const [sevenDayIncome, setSevenDayIncome] = useState([0,0,0,0,0,0,0])

    useEffect(() => {
        setSevenDayIncome(props.sevenDayIncome)
    }, [props.sevenDayIncome])
        

    return (
        <div>LineGraph</div>
    )
}
