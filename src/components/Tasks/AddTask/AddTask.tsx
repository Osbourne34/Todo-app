import React from 'react';

import { Box, Button, IconButton, Typography } from '@mui/material';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';

export const AddTask = () => {
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
                <Button onClick={() => console.log('yes')} variant="contained">
                    Добавить
                </Button>
            </Box>
        </>
    );
};
