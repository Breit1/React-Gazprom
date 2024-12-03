import { Button } from "@consta/uikit/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { registerUser, setAuthError } from "@/store/services.js"; // Импорт экшена для регистрации

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверка на совпадение паролей
        if (formData.password !== formData.confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }

        setError(""); // Сброс ошибок

        try {
            await dispatch(registerUser(formData)).unwrap(); // Регистрация пользователя
            navigate("/home"); // Перенаправление на Home
        } catch (err) {
            setError(err.message || "Произошла ошибка при регистрации");
            dispatch(setAuthError(err.message)); // Логирование ошибки в Redux (опционально)
        }
    };

    return (
        <>
            <p className="title">Регистрация</p>
            <form onSubmit={handleSubmit}>
                <div className="flex">
                    <label>
                        <input
                            required
                            placeholder=""
                            type="text"
                            className="input"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <span>Имя</span>
                    </label>

                    <label>
                        <input
                            required
                            placeholder=""
                            type="text"
                            className="input"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        <span>Фамилия</span>
                    </label>
                </div>

                <label>
                    <input
                        required
                        placeholder=""
                        type="email"
                        className="input"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <span>Email</span>
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
                <label>
                    <input
                        required
                        placeholder=""
                        type="password"
                        className="input"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <span>Повторить пароль</span>
                </label>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Button
                    label="Зарегистрироваться"
                    type="submit"
                    className="submit"
                    style={{ left: "10px" }}
                />
            </form>
            <p className="signin">
                Уже есть аккаунт? <Link to="/auth/login">Войти</Link>
            </p>
        </>
    );
};

export default Register;
