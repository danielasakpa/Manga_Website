// ProtectedRoute.js
import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" state={{prevUrl: location.pathname}}/>;
};

export default ProtectedRoute;
