import React, { useState } from 'react';

import IconButton from '@mui/material/IconButton';

import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';

import { CategoryUpdateForm } from '../CategoryUpdateForm/CategoryUpdateForm';

interface UpdateCategoryProps {
    id: number;
    name: string;
}

export const UpdateCategory = ({ id, name }: UpdateCategoryProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton
                onClick={handleOpen}
                size="small"
                sx={{ mr: 1, display: 'none' }}
            >
                <ModeEditRoundedIcon />
            </IconButton>

            <CategoryUpdateForm
                open={open}
                onClose={handleClose}
                name={name}
                id={id}
            />
        </>
    );
};
