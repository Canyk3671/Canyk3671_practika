const API_BASE_URL = "https://localhost:7131/api";

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/stats/upload`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.statusText}`);
    }

    return await response.json();
};

export const getGeneralStats = async () => {
    const response = await fetch(`${API_BASE_URL}/stats`);

    if (!response.ok) {
        throw new Error(`Ошибка получения статистики: ${response.statusText}`);
    }

    return await response.json();
};

export const getStatsByType = async (type) => {
    const response = await fetch(`${API_BASE_URL}/stats/by-type?type=${type}`);

    if (!response.ok) {
        throw new Error(`Ошибка получения статистики по типу: ${response.statusText}`);
    }

    return await response.json();
};

export const getStatsByChannel = async (channel) => {
    const response = await fetch(`${API_BASE_URL}/stats/by-channel?channel=${channel}`);

    if (!response.ok) {
        throw new Error(`Ошибка получения статистики по каналу: ${response.statusText}`);
    }

    return await response.json();
};

export const getStatsByTemperature = async (temp) => {
    const response = await fetch(`${API_BASE_URL}/stats/by-temperature?temp=${temp}`);

    if (!response.ok) {
        throw new Error(`Ошибка получения статистики по температуре: ${response.statusText}`);
    }

    return await response.json();
};