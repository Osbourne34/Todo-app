import React, { useState } from 'react';

import { categoriesApi } from '../../store/api/categoriesApi';
import { useGetAllPrioritiesQuery } from '../../store/api/prioritiesApi';

import { useInput } from '../../hooks/input';
import { emptyValidator } from '../../utils/validate';

import dayjs, { Dayjs } from 'dayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';

interface TaskFormProps {
    title: string;
    onSubmit: (
        name: string,
        category: number | null,
        priority: number | null,
        dueDate: string | undefined,
    ) => void;
    onClose: () => void;
    loading: boolean;
    error: boolean;
    name?: string;
    category?: number | null;
    priority?: number | null;
    dueDate?: string | undefined;
}

export const TaskForm = React.memo(
    ({
        title,
        onSubmit,
        onClose,
        loading,
        error,
        name,
        category,
        priority,
        dueDate,
    }: TaskFormProps) => {
        const nameTask = useInput(emptyValidator, name || '');
        const [categoryTask, setCategoryTask] = useState<number>(category || 0);
        const [priorityTask, setPriorityTask] = useState<number>(priority || 0);
        const [dueDateTask, setDueDateTask] = useState<Dayjs | null>(
            dayjs(dueDate),
        );

        const categories =
            categoriesApi.endpoints.getAllCategories.useQueryState('').data;
        const { data: priorities } = useGetAllPrioritiesQuery('');

        let isValidDate: boolean = false;

        if (typeof dueDateTask?.format('YYYY-MM-DD') === 'string') {
            if (
                Date.parse(dueDateTask.format('YYYY-MM-DD')) >=
                Date.parse(dayjs().format('YYYY-MM-DD'))
            ) {
                isValidDate = true;
            } else {
                isValidDate = false;
            }
        }

        const handleSubmit = (e: React.SyntheticEvent) => {
            e.preventDefault();
            onSubmit(
                nameTask.value,
                categoryTask ? categoryTask : null,
                priorityTask ? priorityTask : null,
                dueDateTask?.format('YYYY-MM-DD'),
            );
        };

        return (
            <>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <Alert
                                variant="filled"
                                severity="error"
                                sx={{ mb: 2 }}
                            >
                                ?????????????????? ????????????, ???????????????????? ?????? ??????
                            </Alert>
                        )}

                        <TextField
                            value={nameTask.value}
                            onChange={nameTask.onChange}
                            onBlur={nameTask.onBlur}
                            error={nameTask.displayedError}
                            helperText={
                                nameTask.displayedError &&
                                '???????????????? ???????????? ???????????? ?????????????????? ?????????????? 3 ?? ???????????????? 25 ????????????????'
                            }
                            variant="standard"
                            label="???????????????? ????????????"
                            fullWidth
                            required
                            autoFocus
                        />

                        <FormControl
                            variant="standard"
                            fullWidth
                            sx={{ my: 2 }}
                        >
                            <InputLabel>?????????????? ??????????????????</InputLabel>
                            <Select
                                value={categoryTask}
                                onChange={(e: SelectChangeEvent<number>) =>
                                    setCategoryTask(+e.target.value)
                                }
                                label="?????????????? ??????????????????"
                            >
                                <MenuItem value={0}>?????? ??????????????????</MenuItem>

                                {categories &&
                                    categories.map((category) => (
                                        <MenuItem
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>

                        <FormControl
                            variant="standard"
                            fullWidth
                            sx={{ mb: 2 }}
                        >
                            <InputLabel>?????????????? ??????????????????</InputLabel>
                            <Select
                                value={priorityTask}
                                onChange={(e: SelectChangeEvent<number>) =>
                                    setPriorityTask(+e.target.value)
                                }
                                label="?????????????? ??????????????????"
                            >
                                <MenuItem value={0}>?????? ????????????????????</MenuItem>
                                {priorities &&
                                    priorities.map((priority) => (
                                        <MenuItem
                                            key={priority.id}
                                            value={priority.id}
                                        >
                                            {priority.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                value={dueDateTask}
                                onChange={(date: Dayjs | null) =>
                                    setDueDateTask(date)
                                }
                                label="????????"
                                inputFormat="YYYY/MM/DD"
                                renderInput={(params) => (
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        required
                                        {...params}
                                        error={!isValidDate}
                                        helperText={
                                            !isValidDate &&
                                            '???????? ???? ???????????? ???????? ???????????? ??????????????????????'
                                        }
                                    />
                                )}
                            />
                        </LocalizationProvider>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                mt: 4,
                            }}
                        >
                            <Button
                                onClick={onClose}
                                disabled={loading}
                                variant="outlined"
                                sx={{ mr: 2 }}
                            >
                                ????????????
                            </Button>
                            <LoadingButton
                                disabled={nameTask.hasError || !isValidDate}
                                loading={loading}
                                type="submit"
                                variant="contained"
                            >
                                ??????????????????
                            </LoadingButton>
                        </Box>
                    </form>
                </DialogContent>
            </>
        );
    },
);
