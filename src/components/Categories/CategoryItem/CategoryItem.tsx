import React, { useRef } from 'react';

import { NavLink as RouterNavLink } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';

interface CategoryItemProps {
    link: string;
    title: string;
    amount: string;
}

export const CategoryItem = ({ link, title, amount }: CategoryItemProps) => {
    const ref = useRef(null);

    return (
        <Paper
            ref={ref}
            component={RouterNavLink}
            to={link}
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
            <Typography>{title}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton size="small" sx={{ mr: 1, display: 'none' }}>
                    <ModeEditRoundedIcon />
                </IconButton>
                <Paper sx={{ p: 1, bgcolor: 'grey.300' }}>
                    <Typography variant="body2" component="div">
                        {amount}
                    </Typography>
                </Paper>
            </Box>
        </Paper>
    );
};
