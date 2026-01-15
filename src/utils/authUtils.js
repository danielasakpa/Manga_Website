import showToast from './toastUtils';
import { jwtDecode } from 'jwt-decode';
import { safeJsonStringify, getToken, clearAuthData } from './localStorage';

const handleTokenExpiration = (token, logoutCallback) => {
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                logoutCallback();
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            logoutCallback();
        }
    }
};

const setAuthData = (user, token, message, authenticationSource = "local") => {
    if (!user || !token) {
        console.error('Cannot set auth data: user or token is missing');
        return;
    }

    safeJsonStringify('user', user);
    localStorage.setItem('token', token);

    // Check if the 'isGoogle' flag is not set and authenticationSource is 'google'
    if (!localStorage.getItem('isGoogle') && authenticationSource === 'google') {
        localStorage.setItem('isGoogle', 'true');
        showToast(message, 'success');
    }
};

const removeAuthData = () => {
    clearAuthData();
};

export { handleTokenExpiration, setAuthData, removeAuthData };