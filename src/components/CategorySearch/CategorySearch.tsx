import React from 'react';

import { useAppDispatch } from '../../hooks/redux';
import { setSearchValue } from '../../store/reducers/searchSlice/searchSlice';

import TextField from '@mui/material/TextField';

export const CategorySearch = () => {
    const dispatch = useAppDispatch();

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        dispatch(setSearchValue(e.target.value));
    };

    return (
        <TextField
            onChange={handleChange}
            fullWidth
            variant="standard"
            label="Поиск категорий"
        />
    );
};
