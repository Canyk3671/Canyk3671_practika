import { useState } from 'react';
import FileUpload from "./moya_lichnaya_razrabotka/FileUpload";
import Dashboard from "./moya_lichnaya_razrabotka/Dashboard";
import './App.css';

function App() {
    const [dataUploaded, setDataUploaded] = useState(false);

    const handleUploadSuccess = () => {
        setDataUploaded(true);
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>Анализатор статистики тестовых данных изделий</h1>
            </header>

            <main className="app-content">
                {!dataUploaded ? (
                    <FileUpload onUploadSuccess={handleUploadSuccess} />
                ) : (
                    <Dashboard />
                )}
            </main>

            <footer className="app-footer">
                <p>© {new Date().getFullYear()} Система анализа тестовых данных</p>
            </footer>
        </div>
    );
}

export default App;