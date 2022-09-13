import React, { useState } from 'react';

import { useCreateTaskMutation } from '../../store/api/tasksApi';
import { useLazyGetAllCategoriesQuery } from '../../store/api/categoriesApi';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

import { TaskForm } from '../TaskForm/TaskForm';

export const AddTask = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [createTask, { isLoading, isError }] = useCreateTaskMutation();
    const [getAllCategories] = useLazyGetAllCategoriesQuery();

    const handleSubmit = (
        name: string,
        category: number | null,
        priority: number | null,
        dueDate: string | undefined,
    ) => {
        createTask({
            name,
            due_date: dueDate,
            category,
            priority,
        })
            .unwrap()
            .then(() => {
                getAllCategories('');
                handleClose();
            });
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button onClick={() => setOpen(true)} variant="contained">
                Добавить задачу
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth>
                <TaskForm
                    title="Добавление задачи"
                    onSubmit={handleSubmit}
                    onClose={handleClose}
                    loading={isLoading}
                    error={isError}
                />
            </Dialog>
        </>
    );
};
