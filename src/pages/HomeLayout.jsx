import { Outlet } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Footer from "@/components/Footer.jsx";

const HomeLayout = () => {
    return (
        <div>
            <Header></Header>
            <main>
                <Outlet />
            </main>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;
