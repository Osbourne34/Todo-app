import React from 'react';

import { useCreateCategoryMutation } from '../../store/api/categoriesApi';

import { useInput } from '../../hooks/input';
import { emptyValidator } from '../../utils/validate';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert } from '@mui/material';

interface CategotyAddingFormProps {
    onClose: () => void;
    open: boolean;
}

export const CategotyAddingForm = ({
    onClose,
    open,
}: CategotyAddingFormProps) => {
    const nameCategory = useInput(emptyValidator);

    const [createCategory, { isError, isLoading }] =
        useCreateCategoryMutation();

    const clear = () => {
        nameCategory.clear();
        nameCategory.setBlur(false);
        onClose();
    };

    const handleSubmit = () => {
        createCategory({ name: nameCategory.value })
            .unwrap()
            .then(() => clear());
    };

    const handleClose = () => {
        clear();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Добавление категорий</DialogTitle>
            <DialogContent>
                {isError && (
                    <Alert variant="filled" severity="error" sx={{ mb: 2 }}>
                        Ошибка при созданий категорий
                    </Alert>
                )}

                <TextField
                    value={nameCategory.value}
                    onChange={nameCategory.onChange}
                    onBlur={nameCategory.onBlur}
                    error={nameCategory.displayedError}
                    helperText={
                        nameCategory.displayedError &&
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
                    disabled={isLoading}
                    onClick={handleClose}
                    variant="outlined"
                >
                    Отмена
                </Button>
                <LoadingButton
                    disabled={nameCategory.hasError}
                    onClick={handleSubmit}
                    loading={isLoading}
                    variant="contained"
                >
                    Добавить
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};
