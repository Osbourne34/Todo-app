import React from 'react';

import { Button } from '@mui/material';
import { useDialog } from '../../../hooks/dialog';
import TaskAddingForm from '../TaskAddingForm/TaskAddingForm';

export const AddTask = () => {
    const { open, handleOpen, handleClose } = useDialog();

    return (
        <>
            <Button
                onClick={() => handleOpen()}
                sx={{ mb: 4 }}
                variant="contained"
            >
                Добавить
            </Button>

            <TaskAddingForm open={open} onClose={handleClose} />
        </>
    );
};
