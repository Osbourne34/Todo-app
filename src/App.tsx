import React, { useEffect } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';

import { AppRouter } from './components/AppRouter';

import { useAppDispatch, useAppSelector } from './hooks/redux';
import { auth, checkAuth } from './store/reducers/authSlice/authSlice';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const App = () => {
    const { loadingForBackdrop } = useAppSelector(auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem('refreshToken')) {
            dispatch(checkAuth(localStorage.getItem('refreshToken')))
                .unwrap()
                .then((res) => {
                    localStorage.setItem('accessToken', res.access);
                })
                .catch(() => {
                    localStorage.clear();
                });
        }
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={loadingForBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <AppRouter />
        </ThemeProvider>
    );
};
