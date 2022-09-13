import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
    useGetTasksByCategoryQuery,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} from '../../store/api/tasksApi';
import { useLazyGetAllCategoriesQuery } from '../../store/api/categoriesApi';
import {
    setPage,
    setLimit,
    setNumberOfTasks,
} from '../../store/reducers/tasksSlice/tasksSlice';
import { tasks } from '../../store/reducers/tasksSlice/tasksSlice';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Dialog from '@mui/material/Dialog';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { Loader } from '../Loader/Loader';
import { TaskItem } from '../TaskItem/TaskItem';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import { TaskForm } from '../TaskForm/TaskForm';

import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

const tableCell = [
    {
        id: 1,
        title: 'Название',
        value: 'name',
    },
    {
        id: 2,
        title: 'Срок',
        value: 'due_date',
    },
    {
        id: 3,
        title: 'Приоритет',
        value: 'priority',
    },
    {
        id: 4,
        title: 'Категория',
        value: 'category',
    },
];

export const TasksTable = () => {
    const dispatch = useAppDispatch();
    const { page, limit, numberOfTasks } = useAppSelector(tasks);

    const [idToRemove, setIdToDelete] = useState<number>(0);
    const [idToUpdateAndBody, setIdToUpdateAnyBody] = useState<{
        id: number;
        body: {
            name: string;
            category: number | null;
            priority: number | null;
            dueDate: string | undefined;
        };
    }>({
        id: 0,
        body: {
            name: '',
            category: 0,
            priority: 0,
            dueDate: '',
        },
    });

    const [sortType, setSortType] = useState<'default' | 'desc' | 'asc'>(
        'default',
    );
    const [orderBy, setOrderBy] = useState<string>('');

    const { id } = useParams();
    const { data, isLoading } = useGetTasksByCategoryQuery({
        id,
        page: page + 1,
        limit,
        orderBy,
        sortType,
    });
    const [getAllCategories] = useLazyGetAllCategoriesQuery();
    const [updateTask, { isLoading: updateTaskLoading, isError }] =
        useUpdateTaskMutation();
    const [deleteTask, { isLoading: deleteTaskLoading }] =
        useDeleteTaskMutation();

    useEffect(() => {
        if (data && data?.results.length === 1) {
            dispatch(setNumberOfTasks(1));
        } else if (numberOfTasks === 1 && data && data?.results.length > 1) {
            dispatch(setNumberOfTasks(0));
        }
    }, [data]);

    const handleUpdate = (
        id: number,
        {
            name,
            category,
            priority,
            dueDate,
        }: {
            name: string;
            category: number | null;
            priority: number | null;
            dueDate: string | undefined;
        },
    ) => {
        setIdToUpdateAnyBody({
            id,
            body: { name, category, priority, dueDate },
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
    ) => {
        updateTask({
            id: idToUpdateAndBody.id,
            body: { name, category, priority, due_date: dueDate },
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
                if (numberOfTasks === 1) {
                    dispatch(setPage(0));
                }
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
        dispatch(setPage(newPage));
    };

    const handleChangeLimit = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        dispatch(setLimit(+e.target.value));
        dispatch(setPage(0));
    };

    const handleSort = (value: string) => {
        setOrderBy(value);
        setSortType((prevState: any) => {
            switch (prevState) {
                case 'default':
                    return 'asc';
                case 'asc':
                    return 'desc';
                default:
                    return 'default';
            }
        });
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
                                {tableCell.map(
                                    ({ value, title, id }, index) => {
                                        return (
                                            <TableCell
                                                align={
                                                    index === 0
                                                        ? 'left'
                                                        : 'center'
                                                }
                                                sx={{
                                                    pl: index === 0 ? 0 : '',
                                                }}
                                                key={id}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        height: 33,
                                                        '&:hover button': {
                                                            opacity: 1,
                                                        },
                                                    }}
                                                >
                                                    {title}
                                                    <IconButton
                                                        onClick={() =>
                                                            handleSort(value)
                                                        }
                                                        size="small"
                                                        color={
                                                            value === orderBy &&
                                                            sortType !==
                                                                'default'
                                                                ? 'primary'
                                                                : 'inherit'
                                                        }
                                                        sx={{
                                                            opacity:
                                                                value !==
                                                                orderBy
                                                                    ? 0
                                                                    : 1,
                                                            transform:
                                                                sortType !==
                                                                'desc'
                                                                    ? 'rotate(0deg)'
                                                                    : 'rotate(180deg)',
                                                        }}
                                                    >
                                                        <ArrowUpwardRoundedIcon
                                                            sx={{
                                                                fontSize:
                                                                    'inherit',
                                                            }}
                                                        />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                        );
                                    },
                                )}
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
                                    rowsPerPage={limit}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeLimit}
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
