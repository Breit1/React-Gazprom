import './AuthorithationPage.css'
import {Button} from "@consta/uikit/Button";
import { Outlet} from 'react-router-dom';

const AuthorithationLayot = () => {
    return (
        <div className="authorithationBlock">
            <form className="form">
                <Outlet/>
            </form>
        </div>
    );
};

export default AuthorithationLayot;
