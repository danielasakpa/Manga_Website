// AuthProvider.js
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const navigate = useNavigate();

    const login = async (userData) => {
        try {
            const response = await axios.post('https://manga-server-luxr.onrender.com/api/auth/login', userData);
            const { user, token } = response.data;
            setToken(token);

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);

            // Redirect to the previous path if available, otherwise go to the home page
            navigate(-1 || '/');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const logout = async () => {
        try {
            const response = await axios.post('https://manga-server-luxr.onrender.com/api/auth/logout');

            if (response) {
                setToken(null);
                localStorage.removeItem('token');
                localStorage.removeItem('user');

                navigate('/login');
            }
        } catch (error) {
            console.error('An error occurred while Loging out', error);
        }

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
