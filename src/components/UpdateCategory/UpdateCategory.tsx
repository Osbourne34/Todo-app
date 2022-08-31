import React from 'react';

import { CategoryUpdateForm } from '../CategoryUpdateForm/CategoryUpdateForm';
import { useDialog } from '../../hooks/dialog';

import IconButton from '@mui/material/IconButton';

import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';

interface UpdateCategoryProps {
    id: number;
    name: string;
}

export const UpdateCategory = ({ id, name }: UpdateCategoryProps) => {
    const { open, handleOpen, handleClose } = useDialog();

    return (
        <>
            <IconButton
                onClick={(e) => {
                    e.stopPropagation();
                    handleOpen();
                }}
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
