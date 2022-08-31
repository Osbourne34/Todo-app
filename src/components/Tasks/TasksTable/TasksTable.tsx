import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Checkbox, IconButton } from '@mui/material';

import { useGetAllCategoriesQuery } from '../../../store/api/categoriesApi';
import { useGetAllPrioritiesQuery } from '../../../store/api/prioritiesApi';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import { useParams } from 'react-router-dom';
import { useGetTasksByCategoryQuery } from '../../../store/api/tasksApi';
import { Loader } from '../../Loader/Loader';

export const TasksTable = () => {
    const { id } = useParams();
    const { data: tasks, isLoading } = useGetTasksByCategoryQuery(id);
    const { data: categories } = useGetAllCategoriesQuery('');
    const { data: priorities } = useGetAllPrioritiesQuery('');

    if (isLoading) {
        return <Loader />;
    }

    return (
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
                        <TableCell width="150px"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks &&
                        tasks.map(
                            (
                                {
                                    category,
                                    due_date,
                                    id,
                                    is_done,
                                    name,
                                    priority,
                                },
                                index,
                            ) => (
                                <TableRow
                                    hover
                                    key={id}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell
                                        sx={{
                                            width: '35px',
                                            p: 0,
                                            backgroundColor: priorities
                                                ? priorities?.find(
                                                      (item) =>
                                                          item.id === priority,
                                                  )?.color
                                                : '#fff',
                                        }}
                                    ></TableCell>
                                    <TableCell
                                        align="center"
                                        width="60px"
                                        sx={{
                                            p: 0,
                                        }}
                                    >
                                        {index + 1}
                                    </TableCell>
                                    <TableCell sx={{ pl: 0 }}>{name}</TableCell>
                                    <TableCell align="center">
                                        {due_date}
                                    </TableCell>
                                    <TableCell align="center">
                                        {priority
                                            ? priorities?.find(
                                                  (item) =>
                                                      item.id === priority,
                                              )?.name
                                            : 'Без приоритета'}
                                    </TableCell>
                                    <TableCell align="center">
                                        {category
                                            ? categories?.find(
                                                  (item) =>
                                                      item.id === category,
                                              )?.name
                                            : 'Без категорий'}
                                    </TableCell>
                                    <TableCell width="150px" align="right">
                                        <IconButton size="small" color="error">
                                            <DeleteRoundedIcon />
                                        </IconButton>
                                        <IconButton size="small">
                                            <ModeEditRoundedIcon />
                                        </IconButton>
                                        <Checkbox
                                            checked={is_done}
                                            size="small"
                                        />
                                    </TableCell>
                                </TableRow>
                            ),
                        )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
