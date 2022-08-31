import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { UpdateCategory } from '../../UpdateCategory/UpdateCategory';

import { ICategory } from '../../../models/ICategory';

export const CategoryItem = ({ id, name, get_incomplete_tasks }: ICategory) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <Paper
            className={pathname === `/${id}` ? 'active' : ''}
            onClick={() => {
                navigate(`${id}`);
                console.log('click');
            }}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 1.5,
                px: 2,
                mb: 1,
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                    backgroundColor: 'grey.100',
                },
                '&:hover button': {
                    display: 'flex',
                },
            }}
        >
            <Typography>{name}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <UpdateCategory id={id} name={name} />

                <Paper sx={{ p: 1, bgcolor: 'grey.300' }}>
                    <Typography variant="body2" component="div">
                        {get_incomplete_tasks}
                    </Typography>
                </Paper>
            </Box>
        </Paper>
    );
};
