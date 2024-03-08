import { useEffect } from 'react';
import showToast from './toastUtils';
import { jwtDecode } from 'jwt-decode';

// authUtils.js
// authUtils.js

const handleTokenExpiration = (token, logoutCallback) => {
    const checkTokenExpiration = () => {
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                logoutCallback();
            }
        }
    };

    checkTokenExpiration();

    const intervalId = setInterval(() => {
        checkTokenExpiration();
    }, 1000 * 60);

    return () => clearInterval(intervalId);
};

const setAuthData = (userId, token, message, authenticationSource = "local") => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);

    // Check if the 'isGoogle' flag is not set and authenticationSource is 'google'
    if (!localStorage.getItem('isGoogle') && authenticationSource === 'google') {
        localStorage.setItem('isGoogle', true);
        showToast(message, 'success');
    }

};

const removeAuthData = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
};

export { handleTokenExpiration, setAuthData, removeAuthData };

