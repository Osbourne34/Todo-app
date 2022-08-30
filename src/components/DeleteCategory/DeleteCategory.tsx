import React from 'react';

import { useDeleteCategoryMutation } from '../../store/api/categoriesApi';
import { useDialog } from '../../hooks/dialog';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import LoadingButton from '@mui/lab/LoadingButton';

interface DeleteCategory {
    id: number;
    updateLoading: boolean;
}

export const DeleteCategory = ({ id, updateLoading }: DeleteCategory) => {
    const { open, handleOpen, handleClose } = useDialog();

    const [deleteCategory, { isLoading: deleteLoading }] =
        useDeleteCategoryMutation();

    const handleDelete = () => {
        deleteCategory(id)
            .unwrap()
            .then(() => handleClose());
    };

    return (
        <>
            <Button
                disabled={updateLoading}
                onClick={handleOpen}
                variant="contained"
                color="error"
            >
                Удалить
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Подтвердите действие</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Вы действительно хотите удалить категорию?
                        <br />
                        <span>(сами задачи не удаляются)</span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        onClick={handleClose}
                        loading={deleteLoading}
                        variant="outlined"
                    >
                        Отмена
                    </LoadingButton>
                    <LoadingButton
                        onClick={handleDelete}
                        loading={deleteLoading}
                        variant="contained"
                    >
                        Ок
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
};
