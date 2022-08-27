import React, { useRef } from 'react';

import { NavLink as RouterNavLink } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';

import { ICategory } from '../../../models/ICategory';

export const CategoryItem = ({ id, name, get_incomplete_tasks }: ICategory) => {
    const ref = useRef(null);

    return (
        <Paper
            ref={ref}
            component={RouterNavLink}
            to={`/${id}`}
            onClick={(e: React.MouseEvent<HTMLElement>) => {
                if (ref.current !== e.target) {
                    e.preventDefault();
                }
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
                <IconButton size="small" sx={{ mr: 1, display: 'none' }}>
                    <ModeEditRoundedIcon />
                </IconButton>

                <Paper sx={{ p: 1, bgcolor: 'grey.300' }}>
                    <Typography variant="body2" component="div">
                        {get_incomplete_tasks}
                    </Typography>
                </Paper>
            </Box>
        </Paper>
    );
};
