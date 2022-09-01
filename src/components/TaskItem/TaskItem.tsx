import React from 'react';

import { ITask } from '../../models/ITask';

import { useGetAllCategoriesQuery } from '../../store/api/categoriesApi';
import { useGetAllPrioritiesQuery } from '../../store/api/prioritiesApi';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';

interface TaskItemProps extends ITask {
    index: number;
    onDelete: (id: number) => void;
}

export const TaskItem = React.memo(
    ({
        id,
        name,
        category,
        priority,
        due_date,
        is_done,
        index,
        onDelete,
    }: TaskItemProps) => {
        const { data: categories } = useGetAllCategoriesQuery('');
        const { data: priorities } = useGetAllPrioritiesQuery('');

        const handleDelete = () => {
            onDelete(id);
        };

        return (
            <TableRow
                hover
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
                        bgcolor: priority
                            ? priorities?.find((item) => item.id === priority)
                                  ?.color
                            : '',
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
                <TableCell align="center">{due_date}</TableCell>
                <TableCell align="center">
                    {priority
                        ? priorities?.find((item) => item.id === priority)?.name
                        : 'Без приоритета'}
                </TableCell>
                <TableCell align="center">
                    {category
                        ? categories?.find((item) => item.id === category)?.name
                        : 'Без категорий'}
                </TableCell>
                <TableCell width="160px" align="right">
                    <IconButton
                        onClick={handleDelete}
                        size="small"
                        color="error"
                    >
                        <DeleteRoundedIcon />
                    </IconButton>
                    <IconButton size="small" sx={{ mx: 1 }}>
                        <ModeEditRoundedIcon />
                    </IconButton>
                    <Checkbox checked={is_done} size="small" />
                </TableCell>
            </TableRow>
        );
    },
);
