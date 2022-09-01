import React, { useState } from 'react';

import { useCreateTaskMutation } from '../../store/api/tasksApi';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

import { TaskForm } from '../TaskForm/TaskForm';

export const AddTask = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [createTask] = useCreateTaskMutation();

    const handleSubmit = (
        name: string,
        category: number | null,
        priority: number | null,
        dueDate: string | undefined,
    ) => {
        createTask({ name, due_date: dueDate, category, priority }).unwrap();
    };

    return (
        <>
            <Button onClick={() => setOpen(true)} variant="contained">
                Добавить задачу
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <TaskForm onSubmit={handleSubmit} />
            </Dialog>
        </>
    );
};
