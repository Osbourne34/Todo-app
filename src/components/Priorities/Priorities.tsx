import React from 'react';

import { useDialog } from '../../hooks/dialog';

import IconButton from '@mui/material/IconButton';

import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

import { PrioritiesSettings } from './PrioritiesSettings/PrioritiesSettings';

export const Priorities = () => {
    const { open, handleOpen, handleClose } = useDialog();

    return (
        <>
            <IconButton onClick={handleOpen} sx={{ mr: 1 }}>
                <SettingsRoundedIcon />
            </IconButton>

            <PrioritiesSettings open={open} onClose={handleClose} />
        </>
    );
};
