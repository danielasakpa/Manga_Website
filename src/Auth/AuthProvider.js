import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import showToast from '../utils/toastUtils';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            if (!token) {
                try {
                    const response = await axios.get('https://manga-server-luxr.onrender.com/api/auth/login/success', {
                        withCredentials: true,
                    });

                    showToast(response.data.message, 'success');

                    if (response.status !== 200) {
                        showToast('Authentication has failed!', 'error');
                    }

                    const authData = Cookies.get('auth_data');

                    if (authData) {
                        const { userId, token } = JSON.parse(authData.slice(2));
                        localStorage.setItem('userId', userId);
                        localStorage.setItem('token', token);
                        localStorage.setItem("isGoogle", true);
                        setToken(token);
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        };

        getUser();
    }, []);

    const login = async (userData) => {
        try {
            const response = await axios.post('https://manga-server-luxr.onrender.com/api/auth/login', userData);
            const { userId, message, token } = response.data;
            setToken(token);

            showToast(message, 'success');

            localStorage.setItem('userId', userId);
            localStorage.setItem('token', token);

            navigate(-1 || '/');
        } catch (error) {
            showToast('Login failed', 'error');
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        if (localStorage.getItem('isGoogle')) {
            localStorage.removeItem('isGoogle');
            Cookies.remove('auth_data', { domain: 'localhost' });
            window.open("https://manga-server-luxr.onrender.com/api/auth/logout", "_self");
            return;
        }

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
