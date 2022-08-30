import React from 'react';

import { useCreatePriorityMutation } from '../../../store/api/prioritiesApi';

import { useInput } from '../../../hooks/input';
import { useDialog } from '../../../hooks/dialog';
import { emptyValidator } from '../../../utils/validate';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import LoadingButton from '@mui/lab/LoadingButton';

export const AddPriority = () => {
    const namePriority = useInput(emptyValidator);
    const { open, handleOpen, handleClose } = useDialog();

    const [createPriority, { isLoading }] = useCreatePriorityMutation();

    const clear = () => {
        namePriority.clear();
        namePriority.setBlur(false);
        handleClose();
    };

    const handleSubmit = () => {
        createPriority({ name: namePriority.value, color: '#ffffff' })
            .unwrap()
            .then(() => {
                clear();
            });
    };

    return (
        <>
            <Button onClick={handleOpen} variant="contained">
                Добавить приоритет
            </Button>

            <Dialog open={open} onClose={clear}>
                <DialogTitle>Добавление приоритета</DialogTitle>
                <DialogContent>
                    <TextField
                        value={namePriority.value}
                        onChange={namePriority.onChange}
                        onBlur={namePriority.onBlur}
                        error={namePriority.displayedError}
                        helperText={
                            namePriority.displayedError &&
                            'Название приоритета должно содержать мининум 3 и максимум 25 символов'
                        }
                        variant="standard"
                        label="Название приоритета"
                        fullWidth
                        sx={{ width: 400 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        disabled={isLoading}
                        onClick={clear}
                        variant="outlined"
                    >
                        Отмена
                    </Button>
                    <LoadingButton
                        disabled={namePriority.hasError}
                        loading={isLoading}
                        onClick={handleSubmit}
                        variant="contained"
                    >
                        Сохранить
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
};
