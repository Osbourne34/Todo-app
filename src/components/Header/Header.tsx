import React from 'react';

import { useAppDispatch } from '../../hooks/redux';
import {
    setIsShowSidebar,
    setIsShowStatistics,
} from '../../store/reducers/uiSlice/uiSlice';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import { AccountMenu } from '../AccountMenu/AccountMenu';
import { SettingPriorities } from '../SettingPriorities/SettingPriorities';

export const Header = () => {
    const dispatch = useAppDispatch();

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Box>
                <IconButton onClick={() => dispatch(setIsShowSidebar())}>
                    <MenuRoundedIcon />
                </IconButton>
                <Button
                    onClick={() => dispatch(setIsShowStatistics())}
                    sx={{ ml: 2 }}
                >
                    Скрыть статистику
                </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SettingPriorities />
                <AccountMenu />
            </Box>
        </Box>
    );
};
