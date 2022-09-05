import React from 'react';
import { Outlet } from 'react-router-dom';

import { protectedRoute } from '../../hoc/ProtectedRoute/ProtectedRoute';

import Box from '@mui/material/Box';

import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { Statistics } from '../../components/Statistics/Statistics';
import { AddTask } from '../../components/AddTask/AddTask';
import { Category } from '../../components/Category/Category';

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
                <Statistics />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        my: 4,
                    }}
                >
                    <Category />
                    <AddTask />
                </Box>
                <Outlet />
            </Box>
        </Box>
    );
};

export const MainPage = protectedRoute(Main);
