// Protected.js
import React from 'react';
import { useAuth } from '../Auth/AuthProvider';

const Protected = () => {
    const { logout } = useAuth();

    return (
        <div>
            <h2>Protected Page</h2>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Protected;
