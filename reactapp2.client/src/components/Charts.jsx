import React, { useState, useEffect } from 'react';
import {
    Bar,
    Line,
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
import { getGeneralStats } from '../services/api';

// Регистрируем компоненты Chart.js
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

const Charts = () => {
    const [thdDistribution, setThdDistribution] = useState(null);
    const [channelStats, setChannelStats] = useState(null);
    const [tempStats, setTempStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Получаем общую статистику
                const stats = await getGeneralStats();

                // Формируем данные для гистограммы распределения КНИ
                const thdValues = stats.thdValues || [];
                const bins = Array.from({ length: 20 }, (_, i) => i * 0.5);
                const counts = bins.map(bin =>
                    thdValues.filter(value => value >= bin && value < bin + 0.5).length
                );

                setThdDistribution({ bins, counts });

                // Формируем данные для графиков по каналам и температуре
                setChannelStats(stats.channelData);
                setTempStats(stats.temperatureData);

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="loading">Загрузка данных для графиков...</div>;
    if (error) return <div className="error">Ошибка: {error}</div>;

    return (
        <div className="charts-container">
            <h2>Визуализация статистики</h2>

            <div className="chart-section">
                <h3>Распределение коэффициента нелинейных искажений (КНИ)</h3>
                {thdDistribution && (
                    <Bar
                        data={{
                            labels: thdDistribution.bins.map(bin => `${bin.toFixed(1)}-${(bin + 0.5).toFixed(1)}`),
                            datasets: [{
                                label: 'Количество тестов',
                                data: thdDistribution.counts,
                                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 1
                            }]
                        }}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { display: false },
                                title: { display: true, text: 'Распределение КНИ' }
                            },
                            scales: {
                                y: { beginAtZero: true, title: { display: true, text: 'Количество тестов' } },
                                x: { title: { display: true, text: 'Диапазон КНИ' } }
                            }
                        }}
                    />
                )}
            </div>

            <div className="chart-section">
                <h3>Статистика КНИ по каналам</h3>
                {channelStats && (
                    <Bar
                        data={{
                            labels: channelStats.map(item => `Канал ${item.channel}`),
                            datasets: [
                                {
                                    label: 'Средний КНИ',
                                    data: channelStats.map(item => item.averageThd),
                                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                                    borderColor: 'rgba(75, 192, 192, 1)',
                                    borderWidth: 1
                                },
                                {
                                    label: 'Медиана КНИ',
                                    data: channelStats.map(item => item.medianThd),
                                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                                    borderColor: 'rgba(153, 102, 255, 1)',
                                    borderWidth: 1
                                }
                            ]
                        }}
                        options={{
                            responsive: true,
                            plugins: {
                                title: { display: true, text: 'КНИ по каналам' }
                            },
                            scales: {
                                y: { beginAtZero: true, title: { display: true, text: 'Значение КНИ' } },
                                x: { title: { display: true, text: 'Номер канала' } }
                            }
                        }}
                    />
                )}
            </div>

            <div className="chart-section">
                <h3>Зависимость КНИ от температуры</h3>
                {tempStats && (
                    <Line
                        data={{
                            labels: tempStats.map(item => `${item.temperature}°C`),
                            datasets: [{
                                label: 'Средний КНИ',
                                data: tempStats.map(item => item.averageThd),
                                borderColor: 'rgb(255, 99, 132)',
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                tension: 0.1
                            }]
                        }}
                        options={{
                            responsive: true,
                            plugins: {
                                title: { display: true, text: 'Зависимость КНИ от температуры' }
                            },
                            scales: {
                                y: { title: { display: true, text: 'Средний КНИ' } },
                                x: { title: { display: true, text: 'Температура, °C' } }
                            }
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default Charts;