// useErrorHandler.js
import { useState, useCallback } from 'react';

const useErrorHandler = () => {
    const [error, setError] = useState(null);

    const handleErrorResponse = useCallback((statusCode) => {
        switch (statusCode) {
            case 400:
                setError('Bad Request: The server did not understand the request.');
                break;
            case 401:
                setError('Unauthorized: Authentication failed or user lacks necessary permissions.');
                break;
            case 403:
                setError('Forbidden: Access is denied.');
                break;
            case 404:
                setError('Not Found: The requested resource could not be found.');
                break;
            case 500:
                setError('Internal Server Error: Something went wrong on the server.');
                break;
            case 502:
                setError('Bad Gateway: The server, while acting as a gateway or proxy, received an invalid response from an inbound server.');
                break;
            case 503:
                setError('Service Unavailable: The server is not ready to handle the request. Common causes include a temporary overloading or maintenance of the server.');
                break;
            case 'ERR_NETWORK':
                setError('Network Error: Unable to connect to the server. Please check your internet connection.');
                break;
            default:
                setError('An error occurred.');
                break;
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return { error, handleErrorResponse, clearError };
};

export default useErrorHandler;
