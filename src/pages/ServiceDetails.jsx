import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const ServiceDetails = () => {
    const { id } = useParams(); // Получаем id из URL
    const { services = [], isLoading, error } = useSelector((state) => state.services);

    // Находим конкретный сервис
    const service = services.find((s) => s.id === id);

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p style={{ color: 'red' }}>Ошибка: {error}</p>;
    if (!service) return <p>Сервис не найден</p>;

    return (
        <div>
            <h1>{service.title}</h1>
            <img src={service.imgCard} alt={service.title} />
            <p>{service.description}</p>
        </div>
    );
};

export default ServiceDetails;
