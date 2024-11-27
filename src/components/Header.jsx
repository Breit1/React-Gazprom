import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Tabs } from '@consta/uikit/Tabs';
const tabs = [
    {
        label: 'Главная',
        path: 'home',
    },
    {
        label: 'Услуги',
        path: 'services',
    },
];
const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const activeTab = tabs.find((tab) => location.pathname.includes(tab.path)) || tabs[0];


    return (
        <header
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 20px',
                borderBottom: '1px solid #e5e5e5',
            }}
        >
            <Tabs
                items={tabs}
                value={activeTab}
                onChange={(tab) => navigate(tab.path)} // Смена маршрута при нажатии
            />
        </header>
    );
};

export default Header;
