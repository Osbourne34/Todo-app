import React from 'react';

import { Box, Button, IconButton, Typography } from '@mui/material';
import { useDialog } from '../../../hooks/dialog';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';

export const AddTask = () => {
    const { open, handleOpen, handleClose } = useDialog();

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 4,
                }}
            >
                <Box sx={{ display: 'flex' }}>
                    <Typography variant="h4">Категория</Typography>

                    <IconButton>
                        <ModeEditRoundedIcon />
                    </IconButton>
                </Box>
                <Button onClick={() => handleOpen()} variant="contained">
                    Добавить
                </Button>
            </Box>
        </>
    );
};
