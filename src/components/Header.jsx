import React, { useRef } from 'react';
import { Button } from '@consta/uikit/Button';
import { Tooltip } from '@consta/uikit/Tooltip';
import { Text } from '@consta/uikit/Text';
import { useFlag } from '@consta/uikit/useFlag';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import { Tabs } from '@consta/uikit/Tabs';
import { User } from '@consta/uikit/User';
import { Modal } from '@consta/uikit/Modal';

const tabs = [
    { label: 'Главная', path: 'home' },
    { label: 'Услуги', path: 'services' },
];

const Header = () => {
    const anchorRef = useRef(null); // Убрана типизация <HTMLButtonElement>
    const [isTooltipVisible, setIsTooltipVisible] = useFlag();

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
            }}
        >
            <Tabs
                style={{width: '70%'}}
                items={tabs}
                value={activeTab}
                onChange={(tab) => navigate(tab.path)}
            />
            <div className="tooltip-position">
            <User
                withArrow={true}
                size="l"
                name="Роберт Пласт"
                info="Пользователь"
                onClick={setIsTooltipVisible.toggle}
                ref={anchorRef}
            />
            </div>
            <Tooltip
                isOpen={isTooltipVisible}
                direction="downCenter"
                spareDirection="downStartLeft"
                possibleDirections={['upCenter', 'downStartLeft']} // Пример значений
                size="l"
                anchorRef={anchorRef}
                color='white'
            

            >
                <Link to={'/auth/register'}><Button label='Вход'></Button></Link>

            </Tooltip>
        </header>
    );
};

export default Header;
