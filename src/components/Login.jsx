
import {Button} from "@consta/uikit/Button";
import {Link} from "react-router-dom";

const Login = () => {
    return (
        <>
            <p className="title">Вход </p>


            <label style={{width:'300px'}}>
                <input required="" placeholder="" type="email" className="input"/>
                <span>Email</span>
            </label>

            <label>
                <input required="" placeholder="" type="password" className="input"/>
                <span>Пароль</span>
            </label>
            <Button label='Войти' className="submit" style={{left: '10px'}}/>
            <p className="signin">Еще нет аккаунта ? <Link to="/auth/register">Регистрация</Link></p>
        </>
    );
};

export default Login;
