import React from 'react';

import { Button } from '@mui/material';

import { TasksTable } from './TasksTable/TasksTable';

export const Tasks = () => {
    return (
        <>
            <Button sx={{ mb: 4}} variant="contained">
                Добавить
            </Button>
            <TasksTable />
        </>
    );
};
