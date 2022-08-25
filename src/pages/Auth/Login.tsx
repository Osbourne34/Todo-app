import React from 'react';

import { Link as RouterLink, Navigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';
import { auth } from '../../store/reducers/authSlice/authSlice';

import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { LoginForm } from '../../components/LoginForm/LoginForm';

export const Login = () => {
    const { isAuth } = useAppSelector(auth);

    if (localStorage.getItem('refreshToken') && !isAuth) {
        return null;
    }

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <Container maxWidth={'xs'}>
            <Avatar
                sx={{
                    bgcolor: 'secondary.main',
                    mx: 'auto',
                    mt: 10,
                    mb: 1,
                }}
            >
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" textAlign="center" sx={{ mb: 3 }}>
                Вход
            </Typography>

            <LoginForm />

            <Link component={RouterLink} to="/register">
                <Typography textAlign="center" sx={{ mt: 2 }}>
                    Нет аккаунта? Зарегистрироваться
                </Typography>
            </Link>
        </Container>
    );
};
