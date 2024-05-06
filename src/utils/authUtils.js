import showToast from './toastUtils';
import { jwtDecode } from 'jwt-decode';


const handleTokenExpiration = (token, logoutCallback) => {
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                logoutCallback();
            }
        }
};

const setAuthData = (user, token, message, authenticationSource = "local") => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

    // Check if the 'isGoogle' flag is not set and authenticationSource is 'google'
    if (!localStorage.getItem('isGoogle') && authenticationSource === 'google') {
        localStorage.setItem('isGoogle', true);
        showToast(message, 'success');
    }

};

const removeAuthData = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

export { handleTokenExpiration, setAuthData, removeAuthData };

