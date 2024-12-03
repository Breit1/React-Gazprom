import React, { useRef, useState, useEffect } from "react";
import { Button } from "@consta/uikit/Button";
import { Tooltip } from "@consta/uikit/Tooltip";
import { Tabs } from "@consta/uikit/Tabs";
import { User } from "@consta/uikit/User";
import { useDispatch, useSelector } from "react-redux";
import { logout, fetchUserData } from "@/store/auth";
import { useNavigate, Link, useLocation } from "react-router-dom";

const tabs = [
    { label: "Главная", path: "/home" },
    { label: "Услуги", path: "/services" },
];

const Header = () => {
    const anchorRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    const { user, accessToken } = useSelector((state) => state.auth);

    useEffect(() => {
        if (accessToken && !user) {
            dispatch(fetchUserData());
        }
    }, [accessToken, user, dispatch]);

    const activeTab = tabs.find((tab) => location.pathname.includes(tab.path)) || tabs[0];

    const handleLogout = () => {
        dispatch(logout());
        setIsTooltipVisible(false);
        navigate("/auth/login");
    };

    return (
        <header
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 20px",
            }}
        >
            <div>{(new Date().getFullYear())}</div>
            <Tabs
                style={{width: "70%"}}
                items={tabs}
                value={activeTab}
                onChange={(tab) => navigate(tab.path)}
            />
            <div className="tooltip-position">
                <User
                    withArrow
                    size="l"
                    name={user?.username || "Гость"}
                    info={user ? "Пользователь" : "Не авторизован"}
                    onClick={() => setIsTooltipVisible(!isTooltipVisible)}
                    ref={anchorRef}
                />
                <Tooltip
                    isOpen={isTooltipVisible}
                    direction="downCenter"
                    size="l"
                    anchorRef={anchorRef}
                    color="white"
                >
                    {user ? (
                        <Button label="Выход" onClick={handleLogout}/>
                    ) : (
                        <Link to="/auth/login">
                            <Button label="Вход"/>
                        </Link>
                    )}
                </Tooltip>
            </div>
        </header>
    );
};

export default Header;
