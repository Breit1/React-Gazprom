import HomeLayout from '@/pages/HomeLayout.jsx';
import Home from '@/components/Home.jsx';
import Services from "@/components/Services.jsx";
import AuthorithationLayot from "@/pages/AuthorithationLayot.jsx";
import Register from "@/components/Register.jsx";
import Login from "@/components/Login.jsx";

const routes = [
    {
        path: '/',
        element: <HomeLayout />,
        children: [
            {
                path: '/home',
                element: <Home />,
            },
            {
                path: '/services',
                element: <Services />,
            },
        ],
    },
    {
        path: '/auth',
        element: <AuthorithationLayot/>,
        children: [
            {
                path: '/auth/register',
                element: <Register/>,
            },
            {
                path: '/auth/login',
                element: <Login/>,
            },

        ]
    }
];

export default routes;
