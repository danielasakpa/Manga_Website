// utils/toastUtils.js
import { toast } from 'react-toastify';

const showToast = (message, type = 'info') => {
    toast[type](message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
    });
};

export default showToast;
