import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../hooks/redux';
import { auth } from '../store/reducers/authSlice/authSlice';

export const Main = () => {
    const { isAuth } = useAppSelector(auth);

    if (localStorage.getItem('refreshToekn') && isAuth) {
        return <div>Main</div>;
    }

    if (localStorage.getItem('refreshToken')) {
        return null;
    }

    if (!isAuth) {
        return <Navigate to="/login" />;
    }
};
