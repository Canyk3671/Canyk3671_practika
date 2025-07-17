import React from 'react';
import { FileUpload } from './moya_lichnaya_razrabotka/FileUpload';
import { Dashboard } from './moya_lichnaya_razrabotka/Dashboard';
import { Charts } from './moya_lichnaya_razrabotka/Charts';
import { Tables } from './moya_lichnaya_razrabotka/Tables';
import './App.css';

export const App = () => {
    return (
        <div className="App">
            <h1>Анализатор статистики тестовых данных изделий</h1>
            <FileUpload />
            <Dashboard />
            <Charts />
            <Tables />
        </div>
    );
};