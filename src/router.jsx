import HomeLayout from '@/pages/HomeLayout.jsx';
import Home from '@/components/Home.jsx';
import Services from "@/components/Services.jsx";
import AuthorithationLayot from "@/pages/AuthorithationLayot.jsx";
import Register from "@/components/Register.jsx";
import Login from "@/components/Login.jsx";
import ServiceDetails from "@/pages/ServiceDetails.jsx";

const routes = [
    {
        path: '/',
        element: <HomeLayout />,
        children: [
            {
                path: 'home', // Без слэша в начале
                element: <Home />,
            },
            {
                path: 'services',
                element: <Services />,
            },
        ],
    },
    {
        path: '/services/:id',
        element: <ServiceDetails />,
    },
    {
        path: 'auth',
        element: <AuthorithationLayot />,
        children: [
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'login',
                element: <Login />,
            },
        ],
    }
];


export default routes;
