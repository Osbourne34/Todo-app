import React from 'react';

import { useUpdateCategoryMutation } from '../../store/api/categoriesApi';

import { useInput } from '../../hooks/input';
import { emptyValidator } from '../../utils/validate';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import { DeleteCategory } from '../../components/DeleteCategory/DeleteCategory';

interface CategoryUpdateFormProps {
    open: boolean;
    onClose: () => void;
    name: string;
    id: number;
}

export const CategoryUpdateForm = ({
    open,
    onClose,
    name,
    id,
}: CategoryUpdateFormProps) => {
    const newNameCategory = useInput(emptyValidator, name);

    const [updateCategory, { isLoading: updateLoading, isError: updateError }] =
        useUpdateCategoryMutation();

    const handleSubmit = () => {
        updateCategory({ id, name: newNameCategory.value })
            .unwrap()
            .then(() => onClose());
    };

    const handleClose = () => {
        newNameCategory.setValue(name);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Редактирование категорий</DialogTitle>
            <DialogContent>
                {updateError && (
                    <Alert variant="filled" severity="error" sx={{ mb: 2 }}>
                        Ошибка при созданий категорий
                    </Alert>
                )}

                <TextField
                    value={newNameCategory.value}
                    onChange={newNameCategory.onChange}
                    onBlur={newNameCategory.onBlur}
                    error={newNameCategory.displayedError}
                    helperText={
                        newNameCategory.displayedError &&
                        'Название категорий должно содержать мининум 3 и максимум 25 символов'
                    }
                    variant="standard"
                    label="Название категорий"
                    fullWidth
                    sx={{ width: 400 }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    disabled={updateLoading}
                    onClick={handleClose}
                    variant="outlined"
                >
                    Отмена
                </Button>

                <DeleteCategory id={id} updateLoading={updateLoading} />

                <LoadingButton
                    disabled={newNameCategory.hasError}
                    onClick={handleSubmit}
                    loading={updateLoading}
                    variant="contained"
                >
                    Сохранить
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};
