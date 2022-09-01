import React, { useState } from 'react';

import { useUpdatePriorityMutation } from '../../../store/api/prioritiesApi';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';

interface PriorityProps {
    name: string;
    color: string;
    id: number;
    onUpdate: (name: string, id: number) => void;
    onDelete: (id: number) => void;
}

export const Priority = React.memo(
    ({ name, color, id, onDelete, onUpdate }: PriorityProps) => {
        const [selectedColor, setSelectedColor] = useState<string>(color);
        const [updatePriority] = useUpdatePriorityMutation();

        const handleUpdateColor = () => {
            updatePriority({
                id,
                body: { color: selectedColor },
            }).unwrap();
        };

        const handleUpdate = () => {
            onUpdate(name, id);
        };

        const handleDelete = () => {
            onDelete(id);
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
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        onBlur={handleUpdateColor}
                        style={{
                            border: 'none',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
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
                    <IconButton onClick={handleUpdate} size="small">
                        <ModeEditRoundedIcon />
                    </IconButton>
                </Box>
            </Box>
        );
    },
);
