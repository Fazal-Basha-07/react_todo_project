import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import Login from './components/LoginComponent/Login';
import Profile from './components/ProfileComponent/Profile';
import Todo from './components/TodoComponent/Todo';
import Dashboard from './components/DashboardComponent/Dashboard';
import './style.css';
import Register from './components/RegisterComponent/Register';
import { loadUser } from './redux/action';

const App = () => {
    const user = useSelector((state) => state.user);
    const isAuthenticated = user && user.isAuthenticated;
    console.log("isAuthenticated::Checking::", isAuthenticated, user)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch])

    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route
                        path="/dashboard"
                        element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />}
                    />
                    <Route
                        path="/profile"
                        element={isAuthenticated ? <Profile /> : <Navigate to="/" replace />}
                    />
                    <Route
                        path="/todo"
                        element={isAuthenticated ? <Todo /> : <Navigate to="/" replace />}
                    />
                    {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
