// AuthProvider.js
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import showToast from '../utils/toastUtils';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const navigate = useNavigate();

    const login = async (userData) => {
        try {
            const response = await axios.post('https://manga-server-luxr.onrender.com/api/auth/login', userData);
            const { userId, token } = response.data;
            setToken(token);

            localStorage.setItem('userId', userId);
            localStorage.setItem('token', token);

            // Redirect to the previous path if available, otherwise go to the home page
            navigate(-1 || '/');
        } catch (error) {
            showToast('Login failed', "error");
        }
    };

    const logout = async () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

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
