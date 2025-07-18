import { useState, useEffect } from 'react';
import {
    getGeneralStats,
    getStatsByType,
    getStatsByChannel,
    getStatsByTemperature
} from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [filteredStats, setFilteredStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getGeneralStats();
                setStats(data);
                setFilteredStats(data);
            } catch (err) {
                setError(err.message || 'Ошибка при загрузке статистики');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const applyFilter = async () => {
        if (!filterType || !filterValue) {
            setFilteredStats(stats);
            return;
        }

        try {
            setLoading(true);
            let result;

            switch (filterType) {
                case 'type':
                    result = await getStatsByType(filterValue);
                    break;
                case 'channel':
                    result = await getStatsByChannel(filterValue);
                    break;
                case 'temperature':
                    result = await getStatsByTemperature(filterValue);
                    break;
                default:
                    result = stats;
            }

            setFilteredStats(result);
        } catch (err) {
            setError(err.message || 'Ошибка при фильтрации данных');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Загрузка данных...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!filteredStats) return <div>Нет данных для отображения</div>;

    return (
        <div className="stats-dashboard">
            <h2>Анализ тестовых данных изделий</h2>

            <div className="filter-panel">
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="filter-select"
                >
                    <option value="all">Все данные</option>
                    <option value="type">По типу изделия</option>
                    <option value="channel">По каналу</option>
                    <option value="temperature">По температуре</option>
                </select>

                {filterType !== 'all' && (
                    <input
                        type="text"
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        placeholder={`Введите ${filterType === 'type' ? 'тип' : filterType === 'channel' ? 'канал' : 'температуру'}`}
                        className="filter-input"
                    />
                )}

                <button
                    onClick={applyFilter}
                    disabled={filterType !== 'all' && !filterValue}
                    className="apply-button"
                >
                    Применить фильтр
                </button>
            </div>

            <div className="stats-summary">
                <h3>Общая статистика</h3>
                <table className="stats-table">
                    <tbody>
                        <tr>
                            <td>Всего тестов:</td>
                            <td><strong>{filteredStats.totalTests}</strong></td>
                        </tr>
                        <tr>
                            <td>Всего изделий:</td>
                            <td><strong>{filteredStats.totalProducts}</strong></td>
                        </tr>
                        <tr>
                            <td>Средний КНИ:</td>
                            <td><strong>{filteredStats.meanKni.toFixed(2)}</strong></td>
                        </tr>
                        <tr>
                            <td>Медиана КНИ:</td>
                            <td><strong>{filteredStats.medianKni.toFixed(2)}</strong></td>
                        </tr>
                        <tr>
                            <td>Максимальный КНИ:</td>
                            <td><strong>{filteredStats.maxKni.value.toFixed(2)} (канал {filteredStats.maxKni.channel})</strong></td>
                        </tr>
                        <tr>
                            <td>Стандартное отклонение:</td>
                            <td><strong>{filteredStats.stdDeviation.toFixed(2)}</strong></td>
                        </tr>
                        <tr>
                            <td>Аномалии (КНИ > 10):</td>
                            <td><strong>{filteredStats.anomaliesCount} изделий</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="charts-container">
                <h3>Визуализация данных</h3>
                <p>Графики появятся здесь после реализации</p>
            </div>
        </div>
    );
};

export default Dashboard;