import React, { ComponentType } from 'react';

import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';
import { auth } from '../../store/reducers/authSlice/authSlice';

export const protectedRoute = <T extends {}>(Component: ComponentType<T>) => {
    return (props: T) => {
        const { isAuth } = useAppSelector(auth);

        if (localStorage.getItem('refreshToken') && !isAuth) {
            return null;
        }

        if (!isAuth) {
            return <Navigate to="/login" />;
        }

        return <Component {...props} />;
    };
};
