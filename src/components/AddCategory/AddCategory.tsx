import React from 'react';

import { CategotyAddingForm } from '../CategoryAddingForm/CategotyAddingForm';
import { useDialog } from '../../hooks/dialog';

import AddRoundedIcon from '@mui/icons-material/AddRounded';

import IconButton from '@mui/material/IconButton';

export const AddCategory = () => {
    const { open, handleOpen, handleClose } = useDialog();

    return (
        <>
            <IconButton onClick={handleOpen}>
                <AddRoundedIcon />
            </IconButton>

            <CategotyAddingForm open={open} onClose={handleClose} />
        </>
    );
};
