import React, { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

import { Priorities } from './Priorities/Priorities';
import { AddPriority } from './AddPriority/AddPriority';

export const SettingPriorities = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <IconButton onClick={() => setOpen(true)} sx={{ mr: 1 }}>
                <SettingsRoundedIcon />
            </IconButton>

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <DialogTitle>Настройка приоритетов</DialogTitle>
                <DialogContent>
                    <Priorities />
                    <AddPriority />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} variant="contained">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
