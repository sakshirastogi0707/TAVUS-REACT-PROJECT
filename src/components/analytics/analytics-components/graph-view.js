import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const graphView = (props) => {
    const options = {
        animation: false,
        cornerRadius: 20,
        layout: { padding: 0 },
        legend: { display: false },
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    usePointStyle: true,
                }
            }
        },
        scales: {
            x: {
              grid: {
                display: false
              },
              beginAtZero: false,
              ticks: {
                //color: colorCode,
              }
            },
            y: {
              grid: {
                display: true,
                borderDash: [3, 3],
                color: '#3C4254'
              },
              beginAtZero: true,
              ticks: {
                //color: colorCode,
              }
            }
          }
    };
    return (
        <Bar
            height={300}
            options={options}
            data={props?.cubeData ? props.cubeData : []}
        />
    )
}

export default graphView;