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

interface TaskFormProps {
    title?: string;
    onSubmit: (
        name: string,
        category: number | null,
        priority: number | null,
        dueDate: string | undefined,
    ) => void;
}

export const TaskForm = React.memo(({ onSubmit }: TaskFormProps) => {
    const name = useInput(emptyValidator);
    const [category, setCategory] = useState<number>(0);
    const [priority, setPriority] = useState<number>(0);
    const [dueDate, setDueDate] = useState<Dayjs | null>(dayjs());

    const categories =
        categoriesApi.endpoints.getAllCategories.useQueryState('').data;
    const { data: priorities } = useGetAllPrioritiesQuery('');

    let isValidDate: boolean = false;

    if (typeof dueDate?.format('YYYY-MM-DD') === 'string') {
        if (
            Date.parse(dueDate.format('YYYY-MM-DD')) >=
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
            name.value,
            category ? category : null,
            priority ? priority : null,
            dueDate?.format('YYYY-MM-DD'),
        );
    };

    return (
        <>
            <DialogTitle>Добавление задачи</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        value={name.value}
                        onChange={name.onChange}
                        onBlur={name.onBlur}
                        error={name.displayedError}
                        helperText={
                            name.displayedError &&
                            'Название задачи должно содержать минимум 3 и максимум 25 символов'
                        }
                        variant="standard"
                        label="Название задачи"
                        fullWidth
                        required
                        autoFocus
                    />

                    <FormControl variant="standard" fullWidth sx={{ my: 2 }}>
                        <InputLabel>Укажите категорию</InputLabel>
                        <Select
                            value={category}
                            onChange={(e: SelectChangeEvent<number>) =>
                                setCategory(+e.target.value)
                            }
                            label="Укажите категорию"
                        >
                            <MenuItem value={0}>Без категорий</MenuItem>

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

                    <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Укажите приоритет</InputLabel>
                        <Select
                            value={priority}
                            onChange={(e: SelectChangeEvent<number>) =>
                                setPriority(+e.target.value)
                            }
                            label="Укажите приоритет"
                        >
                            <MenuItem value={0}>Без приоритета</MenuItem>
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
                            value={dueDate}
                            onChange={(date: Dayjs | null) => setDueDate(date)}
                            label="Срок"
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
                                        'Дата не должна быть меньше сегодняшней'
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
                        <Button variant="outlined" sx={{ mr: 2 }}>
                            Отмена
                        </Button>
                        <LoadingButton
                            disabled={name.hasError || !isValidDate}
                            type="submit"
                            variant="contained"
                        >
                            Сохранить
                        </LoadingButton>
                    </Box>
                </form>
            </DialogContent>
        </>
    );
});
