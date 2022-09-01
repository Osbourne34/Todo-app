import React, { useState } from 'react';

import {
    useGetAllPrioritiesQuery,
    useDeletePriorityMutation,
    useUpdatePriorityMutation,
} from '../../../store/api/prioritiesApi';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';

import { Loader } from '../../Loader/Loader';
import { Priority } from '../Priority/Priority';
import { ConfirmDialog } from '../../ConfirmDialog/ConfirmDialog';
import { MainForm } from '../../MainForm/MainForm';

export const Priorities = () => {
    const [idAndValueToUpdate, setIdAndValueToUpdate] = useState<{
        id: number;
        name: string;
    }>({ id: 0, name: '' });
    const [idToRemove, setIdToDelete] = useState<number>(0);
    const { data: priorities, isLoading: loadingPriorities } =
        useGetAllPrioritiesQuery('');
    const [updatePriority, { isLoading: loadingUpdate, isError }] =
        useUpdatePriorityMutation();
    const [deletePriority, { isLoading: loadingDeletion }] =
        useDeletePriorityMutation();

    const handleUpdate = (name: string, id: number) => {
        setIdAndValueToUpdate({ name, id });
    };

    const handleDelete = (id: number) => {
        setIdToDelete(id);
    };

    const handleUpdateSubmit = (name: string) => {
        updatePriority({ id: idAndValueToUpdate.id, body: { name } })
            .unwrap()
            .then(() => {
                setIdAndValueToUpdate({ id: 0, name: '' });
            });
    };

    const handleDeletionConfirmation = () => {
        deletePriority({ id: idToRemove })
            .unwrap()
            .then(() => {
                setIdToDelete(0);
            });
    };

    const handleClose = () => {
        setIdToDelete(0);
    };

    const handleCloseForm = () => {
        setIdAndValueToUpdate({ id: 0, name: '' });
    };

    if (loadingPriorities) {
        return <Loader />;
    }

    return (
        <>
            <Box sx={{ mb: 2 }}>
                {priorities &&
                    priorities.map((priority) => {
                        return (
                            <Priority
                                key={priority.id}
                                onUpdate={handleUpdate}
                                onDelete={handleDelete}
                                {...priority}
                            />
                        );
                    })}
            </Box>

            <Dialog
                open={idAndValueToUpdate.id !== 0}
                onClose={handleCloseForm}
                fullWidth
            >
                <DialogTitle>Редактирование приоритета</DialogTitle>
                <DialogContent>
                    <MainForm
                        onSubmit={handleUpdateSubmit}
                        onClose={handleCloseForm}
                        loading={loadingUpdate}
                        error={isError}
                        value={idAndValueToUpdate.name}
                    />
                </DialogContent>
            </Dialog>

            <ConfirmDialog
                open={idToRemove !== 0}
                onClose={handleClose}
                confirmation={handleDeletionConfirmation}
                title="Вы действительно хотите удалить приоритет?"
                subtitle="сами задачи не удаляются"
                loading={loadingDeletion}
            />
        </>
    );
};
