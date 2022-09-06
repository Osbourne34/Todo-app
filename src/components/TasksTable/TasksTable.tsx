import React, { useState } from 'react';

import { useParams } from 'react-router-dom';

import {
    useGetTasksByCategoryQuery,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} from '../../store/api/tasksApi';
import { useLazyGetAllCategoriesQuery } from '../../store/api/categoriesApi';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { Loader } from '../Loader/Loader';
import { TaskItem } from '../TaskItem/TaskItem';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import { TaskForm } from '../TaskForm/TaskForm';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';

export const TasksTable = () => {
    const [idToRemove, setIdToDelete] = useState<number>(0);
    const [idToUpdateAndBody, setIdToUpdateAnyBody] = useState<{
        id: number;
        body: {
            name: string;
            category: number | null;
            priority: number | null;
            dueDate: string | undefined;
            is_done: boolean;
        };
    }>({
        id: 0,
        body: {
            name: '',
            category: 0,
            priority: 0,
            dueDate: '',
            is_done: false,
        },
    });

    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    const { id } = useParams();
    const { data, isLoading } = useGetTasksByCategoryQuery({
        id,
        page: page + 1,
        rowsPerPage,
    });
    const [getAllCategories] = useLazyGetAllCategoriesQuery();
    const [updateTask, { isLoading: updateTaskLoading, isError }] =
        useUpdateTaskMutation();
    const [deleteTask, { isLoading: deleteTaskLoading }] =
        useDeleteTaskMutation();

    const handleUpdate = (
        id: number,
        {
            name,
            category,
            priority,
            dueDate,
            is_done,
        }: {
            name: string;
            category: number | null;
            priority: number | null;
            dueDate: string | undefined;
            is_done: boolean;
        },
    ) => {
        setIdToUpdateAnyBody({
            id,
            body: { name, category, priority, dueDate, is_done },
        });
    };

    const handleDelete = (id: number) => {
        setIdToDelete(id);
    };

    const handleUpdateSubmit = (
        name: string,
        category: number | null,
        priority: number | null,
        dueDate: string | undefined,
        is_done: boolean,
    ) => {
        updateTask({
            id: idToUpdateAndBody.id,
            body: { name, category, priority, due_date: dueDate, is_done },
        })
            .unwrap()
            .then(() => {
                getAllCategories('');
                handleCloseForm();
            });
    };

    const handleDeletionConfirmation = () => {
        deleteTask(idToRemove)
            .unwrap()
            .then(() => {
                getAllCategories('');
                handleCloseConfirm();
            });
    };

    const handleCloseForm = () => {
        setIdToUpdateAnyBody({
            id: 0,
            body: {
                name: '',
                category: 0,
                priority: 0,
                dueDate: '',
                is_done: false,
            },
        });
    };

    const handleCloseConfirm = () => {
        setIdToDelete(0);
    };

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            {data?.results && data.results.length > 0 ? (
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
                            {data.results.map((task, index) => (
                                <TaskItem
                                    key={task.id}
                                    index={index + 1}
                                    onUpdate={handleUpdate}
                                    onDelete={handleDelete}
                                    {...task}
                                />
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    colSpan={7}
                                    count={data.count}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={
                                        handleChangeRowsPerPage
                                    }
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            ) : (
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6">Задачи отсутствуют</Typography>
                </Paper>
            )}

            <Dialog open={idToUpdateAndBody.id !== 0} onClose={handleCloseForm}>
                <TaskForm
                    title="Редактирование задачи"
                    onSubmit={handleUpdateSubmit}
                    onClose={handleCloseForm}
                    loading={updateTaskLoading}
                    error={isError}
                    {...idToUpdateAndBody.body}
                />
            </Dialog>

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
