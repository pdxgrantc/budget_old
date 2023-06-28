import React, { useState, useEffect } from "react";

import { Line } from "react-chartjs-2";
import { Chart, registerables, CategoryScale } from 'chart.js';

Chart.register(...registerables);

Chart.register(CategoryScale);


export default function LineGraph(props) {
    const [input, setInput] = useState([0, 0, 0, 0, 0, 0, 0])
    const [label, setLabel] = useState("")

    useEffect(() => {
        setInput(props.input)
    }, [props.input])

    useEffect(() => {
        if (props.label) {
            setLabel(props.label)
        }
        else {
            setLabel("")
        }
    }, [props.label])

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
            {
                label: label,
                data: input,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },
        ]
    };

    return (
        <div className="mx-auto">
            <Line data={data} />
        </div>
    );
}