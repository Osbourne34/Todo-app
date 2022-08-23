import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Login } from '../pages/Auth/Login';
import { Register } from '../pages/Auth/Register';
import { Main } from '../pages/Main';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
};
