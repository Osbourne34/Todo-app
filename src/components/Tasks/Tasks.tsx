import React from 'react';
import { useParams } from 'react-router-dom';

import { AddTask } from './AddTask/AddTask';
import { TasksTable } from './TasksTable/TasksTable';

export const Tasks = () => {
    const { id } = useParams();
    console.log(id);

    return (
        <>
            <AddTask />
            <TasksTable />
        </>
    );
};
