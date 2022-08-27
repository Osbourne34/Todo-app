import React from 'react';

import './sidebar.css';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { AddCategory } from '../AddCategory/AddCategory';
import { CategorySearch } from '../CategorySearch/CategorySearch';
import { AllCategories } from '../AllCategories/AllCategories';
import { Categories } from '../Categories/Categories';

export const Sidebar = () => {
    return (
        <Paper
            sx={{
                width: '300px',
                height: '100vh',
                flexShrink: 0,
                p: 2,
                overflowY: 'auto',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography textAlign="center" variant="h6">
                    Категорий
                </Typography>
                <AddCategory />
            </Box>

            <Divider sx={{ my: 2 }} />

            <CategorySearch />

            <AllCategories />

            <Divider sx={{ my: 2 }} />

            <Categories />
        </Paper>
    );
};
