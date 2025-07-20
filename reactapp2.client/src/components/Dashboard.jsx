import { useState, useEffect } from 'react';
import { getGeneralStats } from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Функция для "умного" форматирования чисел
    const formatNumber = (value) => {
        if (value === undefined || value === null) return 'N/A';

        // Проверяем, является ли число целым
        if (Number.isInteger(value)) {
            return value.toString(); // Выводим целые числа без дробной части
        }

        // Округляем до 3 знаков для дробных чисел
        const rounded = Math.round(value * 1000) / 1000;

        // Убираем лишние нули после запятой
        return rounded.toString().replace(/\.?0+$/, '');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getGeneralStats();
                setStats(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="loading">Загрузка данных...</div>;
    if (error) return <div className="error">Ошибка: {error}</div>;
    if (!stats) return <div className="no-data">Нет данных для отображения</div>;

    return (
        <div className="dashboard">
            <h2>Статистика тестовых данных</h2>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Общее количество тестов</h3>
                    <p>{formatNumber(stats.count)}</p>
                </div>

                <div className="stat-card">
                    <h3>Средний КНИ</h3>
                    <p>{formatNumber(stats.averageTHD)}</p>
                </div>

                <div className="stat-card">
                    <h3>Медиана КНИ</h3>
                    <p>{formatNumber(stats.medianTHD)}</p>
                </div>

                <div className="stat-card">
                    <h3>Мода КНИ</h3>
                    <p>
                        {stats.modeTHD?.length ? formatNumber(stats.modeTHD[0]) : 'N/A'}
                    </p>
                </div>

                <div className="stat-card">
                    <h3>Средняя температура</h3>
                    <p>{formatNumber(stats.averageTemperature)}</p>
                </div>

                <div className="stat-card">
                    <h3>Медиана температуры</h3>
                    <p>{formatNumber(stats.medianTemperature)}</p>
                </div>

                <div className="stat-card">
                    <h3>Мода температуры</h3>
                    <p>
                        {stats.modeTemperature?.length ? formatNumber(stats.modeTemperature[0]) : 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;