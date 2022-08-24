import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { RegisterForm } from '../../components/RegisterForm/RegisterForm';

export const Register = () => {
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
                Создание аккаунта
            </Typography>

            <RegisterForm />

            <Link component={RouterLink} to="/login">
                <Typography textAlign="center" sx={{ mt: 2 }}>
                    Есть аккаунт? Войти
                </Typography>
            </Link>
        </Container>
    );
};
