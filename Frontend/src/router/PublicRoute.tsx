import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
    children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const isLoggedIn: boolean = JSON.parse(localStorage.getItem('isLogged') || 'false');

    // If logged in, redirect to dashboard (index)
    if (isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    // If not logged in, render the public pages
    return <>{children}</>;
};

export default PublicRoute;
