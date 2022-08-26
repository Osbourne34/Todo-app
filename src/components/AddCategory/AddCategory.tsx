import React, { useState } from 'react';

import { useCreateCategoryMutation } from '../../store/api/categoriesApi';

import { useInput } from '../../hooks/input';
import { emptyValidator } from '../../utils/validate';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';

import AddRoundedIcon from '@mui/icons-material/AddRounded';

export const AddCategory = () => {
    const nameCategory = useInput(emptyValidator);
    const [open, setOpen] = useState<boolean>(false);
    const [addCategory, { isLoading }] = useCreateCategoryMutation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddCategory = async () => {
        addCategory({ name: nameCategory.value })
            .unwrap()
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setOpen(false));
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography textAlign="center" variant="h6">
                    Категорий
                </Typography>
                <IconButton onClick={handleClickOpen}>
                    <AddRoundedIcon />
                </IconButton>
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Добавление категорий</DialogTitle>
                <Box>
                    <DialogContent>
                        <TextField
                            value={nameCategory.value}
                            onChange={nameCategory.onChange}
                            onBlur={nameCategory.onBlur}
                            error={nameCategory.displayedError}
                            helperText={
                                nameCategory.displayedError &&
                                'Название категорий должно содержать минимум 3 и максимум 25 символов'
                            }
                            autoFocus
                            required
                            label="Название категорий"
                            fullWidth
                            variant="standard"
                            sx={{ width: 400 }}
                        />
                    </DialogContent>
                    <DialogActions sx={{ p: 3, pt: 1 }}>
                        <Button onClick={handleClose} variant="outlined">
                            Отмена
                        </Button>
                        <LoadingButton
                            disabled={nameCategory.hasError}
                            onClick={handleAddCategory}
                            loading={isLoading}
                            variant="contained"
                        >
                            Сохранить
                        </LoadingButton>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
};
