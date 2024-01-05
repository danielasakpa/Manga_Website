// Protected.js
import React from 'react';
import { useAuth } from '../Auth/AuthProvider';

const Profile = () => {
    const { logout } = useAuth();

    return (
        <div>
            <h2>Profile Page</h2>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Profile;
