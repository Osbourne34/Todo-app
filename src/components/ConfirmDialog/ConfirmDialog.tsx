import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    confirmation: () => void;
    title: string;
    subtitle: string;
    loading: boolean;
}

export const ConfirmDialog = ({
    open,
    onClose,
    confirmation,
    title,
    subtitle,
    loading,
}: ConfirmDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Подтвердите действите</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {title}
                    <br />({subtitle})
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button disabled={loading} onClick={onClose} variant="outlined">
                    Отмена
                </Button>
                <LoadingButton
                    onClick={confirmation}
                    loading={loading}
                    variant="contained"
                >
                    Ок
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};
