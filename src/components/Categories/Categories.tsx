import React, { useMemo, MouseEvent, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import {
    useGetAllCategoriesQuery,
    useDeleteCategoryMutation,
} from '../../store/api/categoriesApi';

import { search } from '../../store/reducers/searchSlice/searchSlice';
import { useAppSelector } from '../../hooks/redux';

import Typography from '@mui/material/Typography';

import { Category } from '../Category/Category';
import { Loader } from '../Loader/Loader';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';

export const Categories = () => {
    const { searchValue } = useAppSelector(search);
    const [idToRemove, setIdToDelete] = useState<number | string>(0);
    const {
        data: categories,
        isLoading: categoriesLoading,
        isError,
    } = useGetAllCategoriesQuery('');
    const [deleteCategory, { isLoading: deteleCategoryLoading }] =
        useDeleteCategoryMutation();

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const categoriesFound = useMemo(
        () =>
            categories?.filter(({ name }) => {
                if (searchValue) {
                    return name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase());
                }
                return true;
            }),
        [categories, searchValue],
    );

    const handleDelete = (
        e: MouseEvent<HTMLButtonElement>,
        { id }: { id: number | string },
    ) => {
        e.stopPropagation();
        setIdToDelete(id);
    };

    const handleDeletionConfirmation = () => {
        deleteCategory(idToRemove)
            .unwrap()
            .then(() => {
                if (idToRemove == pathname.slice(1)) {
                    navigate('/');
                }
                setIdToDelete(0);
            });
    };

    const handleClose = () => {
        setIdToDelete(0);
    };

    if (categoriesLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Typography>Ошибка при загрузке данных</Typography>;
    }

    return (
        <>
            {categoriesFound &&
                categoriesFound.map(({ id, name, get_incomplete_tasks }) => {
                    return (
                        <Category
                            key={id}
                            link={id}
                            name={name}
                            incompleteTasks={get_incomplete_tasks}
                            removable={true}
                            onDelete={handleDelete}
                        />
                    );
                })}

            <ConfirmDialog
                open={idToRemove !== 0}
                onClose={handleClose}
                confirmation={handleDeletionConfirmation}
                title="Вы действительно хотите удалить категорию?"
                subtitle="сами задачи не удаляются"
                loading={deteleCategoryLoading}
            />
        </>
    );
};
