import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
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

            navigate(-1 || '/');
        } catch (error) {
            showToast('Login failed', "error");
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        navigate('/login');
    };

    const isAuthenticated = () => !!token;

    useEffect(() => {
        const checkTokenExpiration = () => {
            if (token) {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    logout();
                }
            }
        };

        checkTokenExpiration();

        const intervalId = setInterval(() => {
            checkTokenExpiration();
        }, 1000 * 60);

        return () => clearInterval(intervalId);
    }, [token, logout]);

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
