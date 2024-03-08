import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import showToast from '../utils/toastUtils';
import Cookies from 'js-cookie';
import { handleTokenExpiration, setAuthData, removeAuthData } from '../utils/authUtils';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const navigate = useNavigate();

    useEffect(() => {
        const authData = Cookies.get('auth_data');

        if (authData) {
            const { userId, token, message } = JSON.parse(authData.slice(2));
            setAuthData(userId, token, message, 'google');
            setToken(token);
        }
    }, []);

    useEffect(() => {
        const intervalId = handleTokenExpiration(token, logout);

        return () => clearInterval(intervalId);
    }, [token, logout]);

    const login = async (userData) => {
        try {
            const { data } = await axios.post('https://manga-server-luxr.onrender.com/api/auth/login', userData);
            const { userId, message, token } = data;

            setToken(token);
            showToast(message, 'success');
            setAuthData(userId, token);
            navigate(-1 || '/');
        } catch (error) {
            showToast('Login failed', 'error');
        }
    };

    function logout() {
        setToken(null);
        removeAuthData();

        // Check if the user logged in with Google
        if (localStorage.getItem('isGoogle')) {
            // Clear the 'isGoogle' flag
            localStorage.removeItem('isGoogle');

            // Remove the 'auth_data' cookie with domain 'localhost'
            Cookies.remove('auth_data', { domain: 'localhost' });

            // Trigger a logout by opening the server-side logout endpoint
            window.open("http://localhost:5000/api/auth/logout", "_self");

            return;
        }

        navigate('/login');
    };

    const isAuthenticated = () => !!token;

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};

export { AuthProvider, useAuth };
