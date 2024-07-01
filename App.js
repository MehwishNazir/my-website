import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Navigation from './components/shared/Navigation/Navigation';
import Login from './pages/Login/Login';
import Authenticate from './pages/Authenticate/Authenticate';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'; // Import Navigate
import { Provider } from 'react-redux'; // Import Provider
import store from './store'; // Adjust the path based on the relative location of the store directory

function App() {
    return (
        <BrowserRouter>
            <Navigation /> {/* Navigation is basically a logo, every page contains it */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

const GuestRoute = ({ children, ...rest }) => {
    const { isAuth } = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            element={isAuth ? <Navigate to="/rooms" /> : children} // Use Navigate instead of Redirect
        />
    );
};

const SemiProtectedRoute = ({ children, ...rest }) => {
    const { user, isAuth } = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            element={!isAuth ? <Navigate to="/" /> : isAuth && !user.activated ? children : <Navigate to="/rooms" />} // Use Navigate instead of Redirect
        />
    );
};

const ProtectedRoute = ({ children, ...rest }) => {
    const { user, isAuth } = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            element={!isAuth ? <Navigate to="/" /> : isAuth && !user.activated ? <Navigate to="/activate" /> : children} // Use Navigate instead of Redirect
        />
    );
};

export default App;
