import React from 'react';

import { useAppDispatch } from '../../hooks/redux';
import { setIsShowSidebar } from '../../store/reducers/uiSlice/uiSlice';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { AccountMenu } from '../AccountMenu/AccountMenu';

export const Header = () => {
    const dispatch = useAppDispatch();

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
            }}
        >
            <Box>
                <IconButton onClick={() => dispatch(setIsShowSidebar())}>
                    <MenuRoundedIcon />
                </IconButton>
                <Button sx={{ ml: 2 }}>Скрыть статистику</Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton sx={{ mr: 1 }}>
                    <SettingsRoundedIcon />
                </IconButton>
                <AccountMenu />
            </Box>
        </Box>
    );
};
