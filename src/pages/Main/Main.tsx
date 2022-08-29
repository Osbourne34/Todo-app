import React from 'react';

import { protectedRoute } from '../../hoc/ProtectedRoute/ProtectedRoute';

import Box from '@mui/material/Box';

import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { Tasks } from '../../components/Tasks/Tasks';

const Main = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box
                sx={{
                    height: '100vh',
                    overflowY: 'auto',
                    flexGrow: 1,
                    p: 3,
                    bgcolor: 'grey.100',
                }}
            >
                <Header />
                <Tasks />
            </Box>
        </Box>
    );
};

export const MainPage = protectedRoute(Main);
