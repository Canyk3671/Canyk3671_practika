import { useState } from 'react';
import { uploadFile } from '../services/api';

const FileUpload = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile && selectedFile.name.endsWith('.csv')) {
            setFile(selectedFile);
            setError('');
        } else {
            setFile(null);
            setError('Пожалуйста, выберите CSV файл');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setError('Файл не выбран');
            return;
        }

        setIsLoading(true);
        setError('');
        setSuccess(false);

        try {
            const result = await uploadFile(file);
            setSuccess(true);
            if (onUploadSuccess) onUploadSuccess(result);
        } catch (err) {
            setError(err.message || 'Ошибка при загрузке файла');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="file-upload-container">
            <h2>Загрузка данных</h2>
            <form onSubmit={handleSubmit}>
                <div className="file-input">
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        disabled={isLoading}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading || !file}
                    className="upload-button"
                >
                    {isLoading ? 'Загрузка...' : 'Загрузить данные'}
                </button>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">✅ Файл успешно загружен!</div>}
            </form>
        </div>
    );
};

export default FileUpload;