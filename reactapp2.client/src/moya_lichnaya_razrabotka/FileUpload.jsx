import React, { useState } from 'react';

export const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) {
            alert('Пожалуйста, выберите файл.');
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert('Файл успешно загружен!');
        }, 2000);
    };

    return (
        <div>
            <h2>Загрузка CSV-файла</h2>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={isLoading}>
                {isLoading ? 'Загрузка...' : 'Загрузить'}
            </button>
        </div>
    );
};