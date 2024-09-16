import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const isLoggedIn: boolean = JSON.parse(localStorage.getItem('isLogged') || 'false');

    // If not logged in, redirect to login
    if (!isLoggedIn) {
        return <Navigate to="/auth/login" replace />;
    }

    // If logged in, render the protected pages
    return <>{children}</>;
};

export default PrivateRoute;
