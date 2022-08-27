import React from 'react';

import { useGetAllCategoriesQuery } from '../../store/api/categoriesApi';

import Typography from '@mui/material/Typography';

import { CategoryItem } from './CategoryItem/CategoryItem';
import { Loader } from '../Loader/Loader';

export const Categories = () => {
    const { data: categories, isLoading, error } = useGetAllCategoriesQuery('');

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <Typography>Ошибка при загрузке данных</Typography>;
    }

    return (
        <>
            {categories &&
                categories.map(({ id, name, get_incomplete_tasks }) => {
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
