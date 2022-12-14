import React from 'react';

import './sidebar.css';

import { useAppSelector } from '../../hooks/redux';
import { ui } from '../../store/reducers/uiSlice/uiSlice';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { AddCategory } from '../AddCategory/AddCategory';
import { CategorySearch } from '../CategorySearch/CategorySearch';
import { CategoryItem } from '../CategoryItem/CategoryItem';
import { Categories } from '../Categories/Categories';

export const Sidebar = () => {
    const { isShowSidebar } = useAppSelector(ui);

    return (
        <Paper
            elevation={10}
            sx={{
                width: !isShowSidebar ? '300px' : 0,
                height: '100vh',
                flexShrink: 0,
                overflowY: 'auto',
                transition: '.3s',
                zIndex: 1,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                }}
            >
                <Typography variant="h6">Категорий</Typography>
                <AddCategory />
            </Box>

            <Divider />

            <Box sx={{ p: 2 }}>
                <CategorySearch />
                <CategoryItem
                    link="/"
                    name="Все"
                    incompleteTasks={0}
                    removable={false}
                />
            </Box>

            <Divider />

            <Box sx={{ p: 2 }}>
                <Categories />
            </Box>
        </Paper>
    );
};
