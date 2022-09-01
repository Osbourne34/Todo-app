import React, { useState } from 'react';

import { useCreatePriorityMutation } from '../../../store/api/prioritiesApi';

import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import { MainForm } from '../../MainForm/MainForm';

export const AddPriority = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [createPriority, { isLoading, isError }] =
        useCreatePriorityMutation();

    const handleSubmit = (name: string) => {
        createPriority({ name, color: '#ffffff' })
            .unwrap()
            .then(() => {
                handleClose();
            });
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Link
                onClick={() => setOpen(true)}
                variant="body1"
                component="button"
            >
                Добавить приоритет
            </Link>

            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Добавление приоритета</DialogTitle>
                <DialogContent>
                    <MainForm
                        onSubmit={handleSubmit}
                        onClose={handleClose}
                        loading={isLoading}
                        error={isError}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};
