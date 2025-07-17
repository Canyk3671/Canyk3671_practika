import React from 'react';

export const Dashboard = () => {
    const stats = {
        totalTests: 500000,
        totalProducts: 1000,
        averageKNI: 2.1,
        anomalies: 2,
    };

    return (
        <div>
            <h2>Общая статистика</h2>
            <ul>
                <li>Количество тестов: {stats.totalTests}</li>
                <li>Количество изделий: {stats.totalProducts}</li>
                <li>Средний КНИ: {stats.averageKNI}</li>
                <li>Аномалии (КНИ {'>'} 10): {stats.anomalies} изделия</li>
            </ul>
        </div>
    );
};