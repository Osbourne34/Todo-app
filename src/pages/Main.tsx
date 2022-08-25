import React from 'react';
import { Navigate } from 'react-router-dom';

import { protectedRoute } from '../hoc/ProtectedRoute/ProtectedRoute';

import { useAppSelector } from '../hooks/redux';
import { auth } from '../store/reducers/authSlice/authSlice';

const Main = () => {
    const { isAuth } = useAppSelector(auth);

    if (localStorage.getItem('refreshToken') && !isAuth) {
        return null;
    }

    if (!isAuth) {
        return <Navigate to="/login" />;
    }

    return <div>Main</div>;
};

export const MainPage = protectedRoute(Main);
