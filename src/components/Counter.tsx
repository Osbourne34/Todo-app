import React from 'react';

import { Button, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { decrement, increment, selectCount } from '../store/counterSlice';

const Counter = () => {
    const counter = useAppSelector(selectCount);
    const dispatch = useAppDispatch();

    return (
        <>
            <Button onClick={() => dispatch(increment())} variant="contained">
                +
            </Button>
            <Button
                disabled={counter < 1}
                onClick={() => dispatch(decrement())}
                variant="contained"
            >
                -
            </Button>
            <Typography>{counter}</Typography>
        </>
    );
};

export default Counter;
