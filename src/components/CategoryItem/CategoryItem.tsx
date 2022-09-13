import React, { MouseEvent } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/redux';
import { useGetIncompleteTasksQuery } from '../../store/api/tasksApi';
import { setPage } from '../../store/reducers/tasksSlice/tasksSlice';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

interface CategoryItemProps {
    link: number | string;
    name: string;
    incompleteTasks: number;
    removable: boolean;
    onDelete?: (
        e: MouseEvent<HTMLButtonElement>,
        id: { id: string | number },
    ) => void;
}

export const CategoryItem = React.memo(
    ({
        link,
        name,
        incompleteTasks,
        removable,
        onDelete,
    }: CategoryItemProps) => {
        const dispatch = useAppDispatch();

        const navigate = useNavigate();
        const { pathname } = useLocation();

        const { data: incompleteTasksAll } = useGetIncompleteTasksQuery('', {
            skip: removable,
        });

        const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
            if (onDelete) {
                onDelete(e, { id: link });
            }
        };

        return (
            <Paper
                className={
                    pathname === `/${link === '/' ? '' : link}` ? 'active' : ''
                }
                onClick={() => {
                    dispatch(setPage(0));
                    navigate(`${link}`);
                }}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 1.5,
                    px: 2,
                    mb: removable ? 1 : 0,
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: 'grey.100',
                    },
                    '&:hover button': {
                        display: 'flex',
                    },
                }}
            >
                <Typography>{name}</Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {removable && (
                        <IconButton
                            onClick={handleRemove}
                            size="small"
                            sx={{ display: 'none', mr: 1 }}
                        >
                            <DeleteRoundedIcon />
                        </IconButton>
                    )}
                    <Paper sx={{ p: 1, bgcolor: 'grey.300' }}>
                        <Typography variant="body2" component="div">
                            {incompleteTasksAll?.incomplete_count ||
                                incompleteTasks}
                        </Typography>
                    </Paper>
                </Box>
            </Paper>
        );
    },
);
