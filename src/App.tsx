import React, { useEffect } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';

import { useTokenMutation } from './store/testApi';
import { AppRouter } from './components/AppRouter';

export const App = () => {
    const [token] = useTokenMutation();

    useEffect(() => {
        (async () => {
            await token({
                email: 'admin@mail.ru',
                password: 'admin',
            })
                .unwrap()
                .then((data) => {
                    localStorage.setItem('token', data.access);
                    console.log(data, 'res');
                });
        })();
    }, [token]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppRouter />
        </ThemeProvider>
    );
};
