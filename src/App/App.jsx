import './App.css';
import { presetGpnDefault, Theme } from '@consta/uikit/Theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from '@/router.jsx';


function App() {
    return (
        <Theme preset={presetGpnDefault}>
            <Router>
                <Routes>
                    {routes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element}>
                            {route.children &&
                                route.children.map((child, childIndex) => (
                                    <Route
                                        key={childIndex}
                                        path={child.path}
                                        element={child.element}
                                    />
                                ))}
                        </Route>
                    ))}
                </Routes>
            </Router>
        </Theme>
    );
}

export default App;
