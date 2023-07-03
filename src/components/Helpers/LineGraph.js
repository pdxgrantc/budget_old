import React, { useState, useEffect } from "react";

import { Line } from "react-chartjs-2";
import { Chart, registerables, CategoryScale } from 'chart.js';

Chart.register(...registerables);

Chart.register(CategoryScale);


export default function LineGraph(props) {
    const [input, setInput] = useState([0, 0, 0, 0, 0, 0, 0])
    const [label, setLabel] = useState("")
    const [backgroundColor, setBackgroundColor] = useState("rgba(75,192,192,0.5)")
    const [borderColor, setBorderColor] = useState("rgba(75,192,192,1)")

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

    useEffect(() => {
        if (props.backgroundColor) {
            setBackgroundColor(props.backgroundColor)
        }
        else {
            setBackgroundColor("rgba(75,192,192,0.5)")
        }
    }, [props.backgroundColor])

    useEffect(() => {
        if (props.borderColor) {
            setBorderColor(props.borderColor)
        }
        else {
            setBorderColor("rgba(75,192,192,1)")
        }
    }, [props.borderColor])


    const options = {
        scales: {
            x: {
                grid: {
                    color: '#383838' // Change the color of the x-axis lines here
                },
                ticks: {
                    color: '#d6d6d6', // Change the x-axis label text color here
                    font: {
                        size: 14 // Change the x-axis label font size here
                    }
                }
            },
            y: {
                grid: {
                    color: '#383838' // Change the color of the x-axis lines here
                },
                ticks: {
                    color: '#d6d6d6', // Change the y-axis label text color here
                    font: {
                        size: 18 // Change the y-axis label font size here
                    }
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#d6d6d6', // Change the label text color here
                    font: {
                        size: 18 // Change the label font size here
                    }
                }
            }
        }
    };

    const data = {
        labels: ["6 Days Ago", "5 Days Ago", "4 Days Ago", "3 Days Ago", "2 Days Ago", "Yesterday", "Today"],
        datasets: [
            {
                label: label,
                data: input,
                fill: true,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
            },
        ]
    };

    return (
        <div className="w-full h-auto">
            <Line data={data} options={options} />
        </div>
    );
}