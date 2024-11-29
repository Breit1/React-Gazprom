import { Outlet } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Footer from "@/components/Footer.jsx";
import {Card} from "@consta/uikit/Card";

const HomeLayout = () => {
    return (
        <div>
            <Header></Header>
            <Card shadow={false} style={{height:'80vh', border: 'solid 2px #f1f1f1'}}>
                <Outlet />
            </Card>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;
