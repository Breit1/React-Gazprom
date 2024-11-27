import HomeLayout from '@/pages/HomeLayout.jsx';
import Home from '@/components/Home.jsx';
import Services from "@/components/Services.jsx";

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
];

export default routes;
