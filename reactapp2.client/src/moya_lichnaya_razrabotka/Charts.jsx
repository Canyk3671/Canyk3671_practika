import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const Charts = () => {
    const knrDistributionData = {
        labels: ['0-1', '1-2', '2-3', '3-4', '4-5', '5+'],
        datasets: [{
            label: 'Распределение КНИ',
            data: [100, 200, 150, 50, 30, 20],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }],
    };

    const temperatureDependenceData = {
        labels: ['-60°C', '25°C', '60°C'],
        datasets: [{
            label: 'Средний КНИ по температуре',
            data: [2.5, 2.1, 2.3],
            borderColor: 'rgba(153, 102, 255, 0.6)',
            fill: false,
        }],
    };

    return (
        <div>
            <h2>Графики</h2>
            <div style={{ marginBottom: '20px' }}>
                <h3>Распределение КНИ</h3>
                <Bar data={knrDistributionData} />
            </div>
            <div>
                <h3>Зависимость КНИ от температуры</h3>
                <Line data={temperatureDependenceData} />
            </div>
        </div>
    );
};