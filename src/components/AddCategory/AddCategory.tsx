import React, { useState } from 'react';

import { useCreateCategoryMutation } from '../../store/api/categoriesApi';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';

import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { MainForm } from '../MainForm/MainForm';

export const AddCategory = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [createCategory, { isLoading, isError }] =
        useCreateCategoryMutation();

    const handleSubmit = (name: string) => {
        createCategory({ name })
            .unwrap()
            .then(() => {
                handleClose();
            });
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={() => setOpen(true)}>
                <AddRoundedIcon />
            </IconButton>

            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Добавление категорий</DialogTitle>
                <DialogContent>
                    <MainForm
                        onSubmit={handleSubmit}
                        onClose={handleClose}
                        loading={isLoading}
                        error={isError}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};
