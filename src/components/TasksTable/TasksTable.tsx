import React, { useState } from 'react';

import { useParams } from 'react-router-dom';

import {
    useGetTasksByCategoryQuery,
    useDeleteTaskMutation,
} from '../../store/api/tasksApi';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { Loader } from '../Loader/Loader';
import { TaskItem } from '../TaskItem/TaskItem';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';

export const TasksTable = () => {
    const [idToRemove, setIdToDelete] = useState<number>(0);

    const { id } = useParams();
    const { data: tasks, isLoading } = useGetTasksByCategoryQuery(id);
    const [deleteTask, { isLoading: deleteTaskLoading }] =
        useDeleteTaskMutation();

    const handleDelete = (id: number) => {
        setIdToDelete(id);
    };

    const handleDeletionConfirmation = () => {
        deleteTask(idToRemove)
            .unwrap()
            .then(() => handleCloseConfirm());
    };

    const handleCloseConfirm = () => {
        setIdToDelete(0);
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            {tasks && tasks.length > 0 ? (
                <TableContainer component={Paper} sx={{ p: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    width="35px"
                                    sx={{
                                        p: 0,
                                    }}
                                ></TableCell>
                                <TableCell
                                    width="60px"
                                    sx={{
                                        p: 0,
                                    }}
                                ></TableCell>
                                <TableCell sx={{ pl: 0 }}>Название</TableCell>
                                <TableCell align="center">Срок</TableCell>
                                <TableCell align="center">Приоритет</TableCell>
                                <TableCell align="center">Категория</TableCell>
                                <TableCell width="160px"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.map((task, index) => (
                                <TaskItem
                                    key={task.id}
                                    index={index}
                                    onDelete={handleDelete}
                                    {...task}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6">Задачи отсутствуют</Typography>
                </Paper>
            )}

            <ConfirmDialog
                open={idToRemove !== 0}
                onClose={handleCloseConfirm}
                confirmation={handleDeletionConfirmation}
                title="Вы действительно хотите удалить задачу?"
                subtitle=""
                loading={deleteTaskLoading}
            />
        </>
    );
};
