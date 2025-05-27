import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import React from 'react';

const RequireAuth = ({ children, allowedRole }) => {
    const { auth } = useAuth();
    const location = useLocation();

    // If not logged in, redirect to login
    if (!auth?.user) {
        return <Navigate to="/log-in" state={{ from: location }} replace />;
    }

    // Logged in but wrong role
    if (auth.role !== allowedRole) {
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }

    // Role matches, allow access
    return <>{children}</>;
};

export default RequireAuth;