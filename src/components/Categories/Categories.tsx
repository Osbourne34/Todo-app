import React from 'react';

import { useGetAllCategoriesQuery } from '../../store/api/categoriesApi';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { CategoryAll } from './CategoryAll/CategoryAll';
import { CategoryItem } from './CategoryItem/CategoryItem';
import { Loader } from '../Loader/Loader';

export const Categories = () => {
    const { data: categories, isLoading, error } = useGetAllCategoriesQuery('');

    return (
        <>
            <CategoryAll />

            <Divider sx={{ my: 2 }} />

            {isLoading && <Loader />}
            {error && <Typography>Ошибка при загрузке данных</Typography>}

            {categories &&
                categories.map(({ id, name }) => {
                    return (
                        <CategoryItem
                            key={id}
                            link="/login"
                            title={name}
                            amount="15"
                        />
                    );
                })}
        </>
    );
};
