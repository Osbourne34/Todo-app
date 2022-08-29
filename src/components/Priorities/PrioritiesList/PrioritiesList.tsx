import React from 'react';

import { useGetAllPriritiesQuery } from '../../../store/api/prioritiesApi';

import Box from '@mui/material/Box';
import { PrioritiesItem } from '../PrioritiesItem/PrioritiesItem';
import { Loader } from '../../Loader/Loader';

export const PrioritiesList = () => {
    const { data, isLoading } = useGetAllPriritiesQuery('');

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Box>
            {data &&
                data.map((priority) => {
                    return <PrioritiesItem key={priority.id} {...priority} />;
                })}
        </Box>
    );
};