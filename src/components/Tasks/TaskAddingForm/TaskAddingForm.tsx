import React, { useState } from 'react';

import dayjs, { Dayjs } from 'dayjs';

import { useLazyGetAllCategoriesQuery } from '../../../store/api/categoriesApi';

import { useCreateTaskMutation } from '../../../store/api/tasksApi';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useGetAllCategoriesQuery } from '../../../store/api/categoriesApi';
import { useGetAllPrioritiesQuery } from '../../../store/api/prioritiesApi';
import { useInput } from '../../../hooks/input';
import { emptyValidator } from '../../../utils/validate';

interface TaskAddingFormProps {
    open: boolean;
    onClose: () => void;
}

const TaskAddingForm = ({ open, onClose }: TaskAddingFormProps) => {
    const nameTask = useInput(emptyValidator);
    const [categoryTask, setCategoryTask] = useState<string>('');
    const [priorityTask, setPriorityTask] = useState<string>('');
    const [dueDateTask, setDueDateTask] = useState<Dayjs | null>(dayjs());

    let isValidDate: boolean = false;

    const clear = () => {
        nameTask.clear();
        setCategoryTask('');
        setPriorityTask('');
        setDueDateTask(dayjs());
        nameTask.setBlur(false);
        onClose();
    };

    const [createTask, { isLoading }] = useCreateTaskMutation();
    const [getAllCategories] = useLazyGetAllCategoriesQuery();

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

    const handleSubmit = () => {
        createTask({
            name: nameTask.value,
            due_date: dueDateTask?.format('YYYY-MM-DD'),
            category: +categoryTask || null,
            priority: +priorityTask || null,
        })
            .unwrap()
            .then(() => {
                clear();
                getAllCategories('');
            });
    };

    const { data: categories } = useGetAllCategoriesQuery('');
    const { data: priorities } = useGetAllPrioritiesQuery('');

    return (
        <Dialog open={open} onClose={clear}>
            <DialogTitle>Добавление задачи</DialogTitle>
            <DialogContent>
                <TextField
                    value={nameTask.value}
                    onChange={nameTask.onChange}
                    onBlur={nameTask.onBlur}
                    error={nameTask.displayedError}
                    helperText={
                        nameTask.displayedError &&
                        'Название задачи должно содержать минимум 3 и максимум 25 символов'
                    }
                    variant="standard"
                    label="Название"
                    required
                    fullWidth
                />
                <FormControl variant="standard" fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        Укажите категорию
                    </InputLabel>

                    <Select
                        value={categoryTask}
                        onChange={(e: SelectChangeEvent<string>) =>
                            setCategoryTask(e.target.value)
                        }
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Укажите категорию"
                    >
                        {categories &&
                            categories.map(({ id, name }) => {
                                return (
                                    <MenuItem key={id} value={id}>
                                        {name}
                                    </MenuItem>
                                );
                            })}
                    </Select>
                </FormControl>
                <FormControl variant="standard" fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        Укажите приоритет
                    </InputLabel>
                    <Select
                        value={priorityTask}
                        onChange={(e: SelectChangeEvent<string>) =>
                            setPriorityTask(e.target.value)
                        }
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Укажите приоритет"
                    >
                        {priorities &&
                            priorities.map(({ id, name }) => {
                                return (
                                    <MenuItem key={id} value={id}>
                                        {name}
                                    </MenuItem>
                                );
                            })}
                    </Select>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label="Срок"
                        inputFormat="DD/MM/YYYY"
                        value={dueDateTask}
                        onChange={(value: Dayjs | null) =>
                            setDueDateTask(value)
                        }
                        renderInput={(params) => (
                            <TextField
                                required
                                fullWidth
                                variant="standard"
                                {...params}
                                error={!isValidDate}
                                helperText={
                                    !isValidDate &&
                                    'Дата не должна быть меньше сегодняшней'
                                }
                            />
                        )}
                    />
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button disabled={isLoading} onClick={clear} variant="outlined">
                    Отмена
                </Button>
                <LoadingButton
                    onClick={handleSubmit}
                    loading={isLoading}
                    variant="contained"
                    disabled={nameTask.hasError || !isValidDate}
                >
                    Сохранить
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default TaskAddingForm;
