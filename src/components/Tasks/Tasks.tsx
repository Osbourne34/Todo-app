import React from 'react';

import { AddTask } from './AddTask/AddTask';
import { TasksTable } from './TasksTable/TasksTable';

export const Tasks = () => {
    return (
        <>
            <AddTask />
            <TasksTable />
        </>
    );
};
