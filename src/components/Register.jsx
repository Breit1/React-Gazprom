
import {Button} from "@consta/uikit/Button";
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';

const Register = () => {
    return (
        <>
            <p className="title">Регистрация </p>
            <div className="flex">
                <label>
                    <input required="" placeholder="" type="text" className="input"/>
                    <span>Имя</span>
                </label>

                <label>
                    <input required="" placeholder="" type="text" className="input"/>
                    <span>Фамилия</span>
                </label>
            </div>

            <label>
                <input required="" placeholder="" type="email" className="input"/>
                <span>Email</span>
            </label>

            <label>
                <input required="" placeholder="" type="password" className="input"/>
                <span>Пароль</span>
            </label>
            <label>
                <input required="" placeholder="" type="password" className="input"/>
                <span>Повторить пароль</span>
            </label>
            <Button label='Зарегистрироваться' className="submit" style={{left: '10px'}}/>
            <p className="signin">Уже есть аккаунт ? <Link to="/auth/login">Войти</Link></p>
        </>
    );
};

export default Register;
