import React, { useState } from 'react';

import AddRoundedIcon from '@mui/icons-material/AddRounded';

import IconButton from '@mui/material/IconButton';

import { CategotyAddingForm } from '../CategoryAddingForm/CategotyAddingForm';

export const AddCategory = () => {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleOpen}>
                <AddRoundedIcon />
            </IconButton>

            <CategotyAddingForm open={open} onClose={handleClose} />
        </>
    );
};
