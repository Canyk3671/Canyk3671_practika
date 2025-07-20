import React, { useState } from 'react';

export const Tables = () => {
    const [data] = useState([
        { type: 'type1', channel: 13, knr: 2.1, temperature: 25 },
        { type: 'type2', channel: 15, knr: 1.9, temperature: 60 },
        { type: 'type1', channel: 20, knr: 2.3, temperature: -60 },
    ]);

    return (
        <div>
            <h2>Таблица данных</h2>
            <table>
                <thead>
                    <tr>
                        <th>Тип изделия</th>
                        <th>Канал</th>
                        <th>КНИ</th>
                        <th>Температура (°C)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.type}</td>
                            <td>{item.channel}</td>
                            <td>{item.knr}</td>
                            <td>{item.temperature}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};