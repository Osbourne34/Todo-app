import React, { useMemo } from 'react';

import { useGetAllCategoriesQuery } from '../../store/api/categoriesApi';
import { useAppSelector } from '../../hooks/redux';
import { search } from '../../store/reducers/searchSlice/searchSlice';

import Typography from '@mui/material/Typography';

import { CategoryItem } from './CategoryItem/CategoryItem';
import { Loader } from '../Loader/Loader';

export const Categories = () => {
    const { searchValue } = useAppSelector(search);
    const { data: categories, isLoading, error } = useGetAllCategoriesQuery('');

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

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <Typography>Ошибка при загрузке данных</Typography>;
    }

    return (
        <>
            {categoriesFound &&
                categoriesFound.map(({ id, name, get_incomplete_tasks }) => {
                    return (
                        <CategoryItem
                            key={id}
                            id={id}
                            name={name}
                            get_incomplete_tasks={get_incomplete_tasks}
                        />
                    );
                })}
        </>
    );
};
