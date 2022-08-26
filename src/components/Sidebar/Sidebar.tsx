import React from 'react';

import './sidebar.css';

import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

import { AddCategory } from '../AddCategory/AddCategory';
import { SearchCategory } from '../SearchCategory/SearchCategory';
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
            <AddCategory />

            <Divider sx={{ my: 2 }} />

            <SearchCategory />

            <Categories />
        </Paper>
    );
};
