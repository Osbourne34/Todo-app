import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../hooks/redux';
import { auth } from '../store/reducers/authSlice/authSlice';

export const Main = () => {
    const { isAuth } = useAppSelector(auth);

    if (!isAuth) {
        return <Navigate to="/login" />;
    }

    return <div>Main</div>;
};
