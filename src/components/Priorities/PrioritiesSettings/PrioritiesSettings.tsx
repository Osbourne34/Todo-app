import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { PrioritiesList } from '../PrioritiesList/PrioritiesList';
import { Button, DialogActions } from '@mui/material';
import { AddPriority } from '../AddPriority/AddPriority';

interface PrioritiesSettingsProps {
    open: boolean;
    onClose: () => void;
}

export const PrioritiesSettings = ({
    open,
    onClose,
}: PrioritiesSettingsProps) => {
    return (
        <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={onClose}>
            <DialogTitle>Настройка приоритетов</DialogTitle>
            <DialogContent>
                <PrioritiesList />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined">
                    Отмена
                </Button>
                <AddPriority />
            </DialogActions>
        </Dialog>
    );
};
