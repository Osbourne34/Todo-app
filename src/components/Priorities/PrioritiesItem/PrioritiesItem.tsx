import React, { useState } from 'react';

import {
    useUpdatePriorityMutation,
    useDeletePriorityMutation,
} from '../../../store/api/prioritiesApi';

import Box from '@mui/material/Box';
import { IconButton, Typography } from '@mui/material';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import { IPriority } from '../../../models/IPriority';

export const PrioritiesItem = ({ name, color, id }: IPriority) => {
    const [selectedColor, setSelectedColor] = useState<string>(color);

    const [updatePriority] = useUpdatePriorityMutation();
    const [deletePriority] = useDeletePriorityMutation();

    const handleChangeColor = () => {
        updatePriority({ id, body: { name, color: selectedColor } }).unwrap();
    };

    const handleDelete = () => {
        deletePriority({ id }).unwrap();
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Box>
                <Typography>{name}</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="color"
                    onBlur={handleChangeColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    value={selectedColor}
                    style={{
                        border: 'none',
                        backgroundColor: 'transparent',
                    }}
                />
                <IconButton
                    onClick={handleDelete}
                    color="error"
                    size="small"
                    sx={{ ml: 3, mr: 1 }}
                >
                    <DeleteRoundedIcon />
                </IconButton>
                <IconButton size="small">
                    <ModeEditRoundedIcon />
                </IconButton>
            </Box>
        </Box>
    );
};
