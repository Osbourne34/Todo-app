import React, { ReactNode } from 'react';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { Loader } from '../../Loader/Loader';

interface StatisticsItemProps {
    Icon: any;
    title: string;
    loading: boolean;
    value?: number;
    count?: number;
    percent?: number;
}

export const StatisticsItem = ({
    title,
    Icon,
    value,
    count,
    loading,
}: StatisticsItemProps) => {
    return (
        <Paper sx={{ p: 2, flexGrow: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Paper
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 100,
                        height: 100,
                        mt: -4,
                        bgcolor: 'warning.light',
                    }}
                >
                    <Icon sx={{ color: 'common.white', fontSize: 50 }} />
                </Paper>
                <Typography variant="h4">
                    {loading ? (
                        <Loader />
                    ) : count || count === 0 ? (
                        `${value} из ${count}`
                    ) : (
                        `${value}%`
                    )}
                </Typography>
            </Box>

            <Divider sx={{ mt: 3, mb: 1 }} />
            <Typography>{title}</Typography>
        </Paper>
    );
};
