import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Checkbox, IconButton } from '@mui/material';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';

function createData(
    color: string,
    id: number,
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { color, id, name, calories, fat, carbs, protein };
}

const rows = [
    createData('red', 1, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('red', 1, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('red', 1, 'Eclair', 262, 16.0, 24, 6.0),
    createData('red', 1, 'Cupcake', 305, 3.7, 67, 4.3),
    createData('red', 1, 'Gingerbread', 356, 16.0, 49, 3.9),
];

export const TasksTable = () => {
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
                    {rows.map((row) => (
                        <TableRow
                            hover
                            key={row.name}
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
                                    backgroundColor: 'success.main',
                                }}
                            ></TableCell>
                            <TableCell
                                align="center"
                                width="60px"
                                sx={{
                                    p: 0,
                                }}
                            >
                                {row.id}
                            </TableCell>
                            <TableCell sx={{ pl: 0 }}>{row.name}</TableCell>
                            <TableCell align="center">{row.calories}</TableCell>
                            <TableCell align="center">{row.fat}</TableCell>
                            <TableCell align="center">{row.carbs}</TableCell>
                            <TableCell width="150px" align="right">
                                <IconButton size="small" color="error">
                                    <DeleteRoundedIcon />
                                </IconButton>
                                <IconButton size="small">
                                    <ModeEditRoundedIcon />
                                </IconButton>
                                <Checkbox size="small" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
