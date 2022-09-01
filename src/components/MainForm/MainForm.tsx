import React from 'react';

import { useInput } from '../../hooks/input';
import { emptyValidator } from '../../utils/validate';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';

interface MainFormProps {
    onSubmit: (name: string) => void;
    onClose: () => void;
    loading: boolean;
    error: boolean;
    value?: string;
}

export const MainForm = ({
    onSubmit,
    onClose,
    loading,
    error,
    value,
}: MainFormProps) => {
    const name = useInput(emptyValidator, value);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        onSubmit(name.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && (
                <Alert variant="filled" severity="error" sx={{ mb: 2 }}>
                    Произошла ошибка, попробуйте ещё раз
                </Alert>
            )}

            <TextField
                value={name.value}
                onChange={name.onChange}
                onBlur={name.onBlur}
                error={name.displayedError}
                helperText={
                    name.displayedError &&
                    'Название должно содержать минимум 3 и максимум 25 символов'
                }
                label="Название"
                variant="standard"
                autoFocus
                required
                fullWidth
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                <Button
                    disabled={loading}
                    onClick={onClose}
                    variant="outlined"
                    sx={{ mr: 2 }}
                >
                    Отмена
                </Button>
                <LoadingButton
                    type="submit"
                    disabled={name.hasError}
                    loading={loading}
                    variant="contained"
                >
                    Сохранить
                </LoadingButton>
            </Box>
        </form>
    );
};
