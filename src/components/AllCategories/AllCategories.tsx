import React from 'react';

import { useGetIncompleteTasksQuery } from '../../store/api/tasksApi';

import { NavLink as RouterNavLink } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export const AllCategories = () => {
    const { data } = useGetIncompleteTasksQuery('');

    return (
        <Paper
            component={RouterNavLink}
            to="/"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 1.5,
                px: 2,
                mt: 4,
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                    backgroundColor: 'grey.100',
                },
            }}
        >
            <Typography>Все</Typography>
            <Paper sx={{ p: 1, bgcolor: 'grey.300' }}>
                <Typography variant="body2" component="div">
                    {data?.incomplete_count || '0'}
                </Typography>
            </Paper>
        </Paper>
    );
};
