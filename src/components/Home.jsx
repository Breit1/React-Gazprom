import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/TextDeprecated';
import { Button } from '@consta/uikit/Button';


const API_URL = 'https://673423afa042ab85d1190055.mockapi.io/api/v1/main';

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(API_URL);
            setData(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    if (data.length === 0) {
        return <div>Нет данных для отображения</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Главная</h1>
            <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {data.map((item) => (
                    <Card
                        key={item.id}
                        style={{
                            width: '300px',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            backgroundColor: '#fff',
                        }}
                    >
                        <Text
                            size="l"
                            weight="bold"
                            style={{ marginBottom: '10px', textAlign: 'center', color: '#333' }}
                        >
                            {item.name || 'Без имени'}
                        </Text>
                        <Text style={{ color: '#666', textAlign: 'center', marginBottom: '15px' }}>
                            {item.description || 'Нет описания'}
                        </Text>
                        <Button
                            label="Подробнее"
                            onClick={() => alert('Вы нажали на кнопку Подробнее!')}
                            size="s"
                            view="secondary"
                            style={{ width: '100%', marginTop: '10px' }}
                        />
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Home;
