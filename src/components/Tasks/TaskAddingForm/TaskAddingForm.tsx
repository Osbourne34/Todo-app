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
    TextField,
} from '@mui/material';

// import { useGetAllCategoriesQuery } from '../../../store/api/categoriesApi';
import { useGetAllPrioritiesQuery } from '../../../store/api/prioritiesApi';

import React from 'react';

interface TaskAddingFormProps {
    open: boolean;
    onClose: () => void;
}

const TaskAddingForm = ({ open, onClose }: TaskAddingFormProps) => {
    // const { data: categories } = useGetAllCategoriesQuery('');
    const { data: priorities } = useGetAllPrioritiesQuery('');

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Добавление задачи</DialogTitle>
            <DialogContent>
                <TextField
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
                        defaultValue={''}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Укажите категорию"
                    >
                        {/* {categories &&
                            categories.map(({ id, name }) => {
                                return (
                                    <MenuItem key={id} value={name}>
                                        {name}
                                    </MenuItem>
                                );
                            })} */}
                    </Select>
                </FormControl>

                <FormControl variant="standard" fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        Укажите приоритет
                    </InputLabel>
                    <Select
                        defaultValue={''}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Укажите приоритет"
                    >
                        {priorities &&
                            priorities.map(({ id, name }) => {
                                return (
                                    <MenuItem key={id} value={name}>
                                        {name}
                                    </MenuItem>
                                );
                            })}
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    variant="standard"
                    id="date"
                    label="Срок"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button>Отмена</Button>
                <Button>Сохранить</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskAddingForm;
