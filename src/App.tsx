import React, { useEffect, useState } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';

import { AppRouter } from './components/AppRouter';

import axios from 'axios';
import { API_URL } from './constants/api';
import { IAuthResponse } from './models/IAuthResponse';
import { useAppDispatch } from './hooks/redux';
import { setAuth } from './store/reducers/authSlice/authSlice';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const App = () => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (localStorage.getItem('refreshToken')) {
            setLoading(true);
            axios
                .post<IAuthResponse>(API_URL + 'user/token/refresh/', {
                    refresh: localStorage.getItem('refreshToken'),
                })
                .then((res) => {
                    dispatch(setAuth(true));
                    localStorage.setItem('accessToken', res.data.access);
                })
                .catch((e) => {
                    dispatch(setAuth(false));
                    localStorage.clear();
                })
                .finally(() => setLoading(false));
        }
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {loading && (
                <Backdrop
                    sx={{
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
            <AppRouter />
        </ThemeProvider>
    );
};
