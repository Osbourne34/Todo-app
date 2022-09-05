import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';

import {
    useGetCategoryQuery,
    useUpdateCategoryMutation,
} from '../../store/api/categoriesApi';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';

import { MainForm } from '../MainForm/MainForm';

export const Category = () => {
    const { pathname } = useLocation();
    const [open, setOpen] = useState<boolean>(false);

    const { data: category } = useGetCategoryQuery(pathname, {
        skip: pathname === '/',
    });

    const [updateCategory, { isLoading, isError }] =
        useUpdateCategoryMutation();

    const handleUpdateSubmit = (name: string) => {
        updateCategory({ id: +pathname.slice(1), name })
            .unwrap()
            .then(() => handleClose());
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Typography variant="h4">
                    {category && pathname !== '/' ? category?.name : 'Все'}
                </Typography>
                {category && pathname !== '/' && (
                    <IconButton onClick={() => setOpen(true)} sx={{ ml: 1 }}>
                        <ModeEditRoundedIcon />
                    </IconButton>
                )}
            </Box>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Редактирование категорий</DialogTitle>
                <DialogContent>
                    <MainForm
                        onSubmit={handleUpdateSubmit}
                        onClose={handleClose}
                        loading={isLoading}
                        error={isError}
                        value={category?.name}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};
