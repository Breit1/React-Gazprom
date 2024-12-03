import './AuthorithationPage.css'
import {Button} from "@consta/uikit/Button";
import { Outlet} from 'react-router-dom';

const AuthorithationLayot = () => {
    return (
        <div className="authorithationBlock">
            <div className="form">
                <Outlet/>
            </div>
        </div>
    );
};

export default AuthorithationLayot;
