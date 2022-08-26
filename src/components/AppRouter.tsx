import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { LoginPage } from '../pages/Auth/Login';
import { RegisterPage } from '../pages/Auth/Register';
import { MainPage } from '../pages/Main/Main';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    );
};
