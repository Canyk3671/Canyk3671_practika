import React from 'react';

const StatCard = ({ title, value }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
            <p className="text-2xl font-bold my-2">{value}</p>
        </div>
    );
};

export default StatCard;