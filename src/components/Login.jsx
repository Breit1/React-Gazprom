import React, { useState } from "react";
import { Button } from "@consta/uikit/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/auth";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");

    const isLoading = useSelector((state) => state.auth.isLoading);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(""); // Сброс ошибок

        try {
            const result = await dispatch(loginUser(formData)).unwrap();
            console.log("Успешный вход:", result);
            navigate("/home");
        } catch (err) {
            setError(err || "Неверные данные для входа");
        }
    };

    return (
        <>
            <p className="title">Вход</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        required
                        placeholder=""
                        type="text"
                        className="input"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <span>Имя пользователя</span>
                </label>

                <label>
                    <input
                        required
                        placeholder=""
                        type="password"
                        className="input"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <span>Пароль</span>
                </label>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Button
                    label={isLoading ? "Загрузка..." : "Войти"}
                    type="submit"
                    className="submit"
                    style={{ left: "10px" }}
                    disabled={isLoading}
                />
            </form>
            <p className="signin">
                Еще нет аккаунта? <Link to="/auth/register">Регистрация</Link>
            </p>
        </>
    );
};

export default Login;
