import React from 'react';

import { useLocation } from 'react-router-dom';

import { useGetStatisticsQuery } from '../../store/api/tasksApi';

import Box from '@mui/material/Box';

import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';
import InsertChartRoundedIcon from '@mui/icons-material/InsertChartRounded';

import { StatisticsItem } from './StatisticsItem/StatisticsItem';

export const Statistics = () => {
    const { pathname } = useLocation();
    const { data: statistics, isLoading } = useGetStatisticsQuery(
        pathname.slice(1) ? +pathname.slice(1) : 0,
    );

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 4,
                my: 4,
            }}
        >
            <StatisticsItem
                loading={isLoading}
                title="Завершенные задачи"
                Icon={CheckRoundedIcon}
                value={statistics?.completed_tasks}
                count={statistics?.tasks_count}
            />
            <StatisticsItem
                loading={isLoading}
                title="Незавершенные задачи"
                Icon={ThumbDownRoundedIcon}
                value={statistics?.incompleted_tasks}
                count={statistics?.tasks_count}
            />
            <StatisticsItem
                loading={isLoading}
                title="Процент завершенных задач"
                Icon={InsertChartRoundedIcon}
                value={statistics?.completed_percent}
            />
            <StatisticsItem
                loading={isLoading}
                title="Процент незавершенных задач"
                Icon={InsertChartRoundedIcon}
                value={statistics?.incompleted_percent}
            />
        </Box>
    );
};
