import React from 'react';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';
import InsertChartRoundedIcon from '@mui/icons-material/InsertChartRounded';

export const Statistics = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4, my: 4 }}>
            <Paper sx={{ p: 2, flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Paper
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 120,
                            height: 120,
                            mt: -4,
                            bgcolor: 'warning.light',
                        }}
                    >
                        <CheckRoundedIcon
                            sx={{ color: 'common.white', fontSize: 60 }}
                        />
                    </Paper>
                    <Typography variant="h3">5 из 20</Typography>
                </Box>

                <Divider sx={{ mt: 3, mb: 1 }} />
                <Typography>Завершенные задачи</Typography>
            </Paper>
            <Paper sx={{ p: 2, flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Paper
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 120,
                            height: 120,
                            mt: -4,
                            bgcolor: 'warning.light',
                        }}
                    >
                        <ThumbDownRoundedIcon
                            sx={{ color: 'common.white', fontSize: 60 }}
                        />
                    </Paper>
                    <Typography variant="h3">5 из 20</Typography>
                </Box>

                <Divider sx={{ mt: 3, mb: 1 }} />
                <Typography>Завершенные задачи</Typography>
            </Paper>
            <Paper sx={{ p: 2, flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Paper
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 120,
                            height: 120,
                            mt: -4,
                            bgcolor: 'warning.light',
                        }}
                    >
                        <InsertChartRoundedIcon
                            sx={{ color: 'common.white', fontSize: 60 }}
                        />
                    </Paper>
                    <Typography variant="h3">5 из 20</Typography>
                </Box>

                <Divider sx={{ mt: 3, mb: 1 }} />
                <Typography>Завершенные задачи</Typography>
            </Paper>
            <Paper sx={{ p: 2, flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Paper
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 120,
                            height: 120,
                            mt: -4,
                            bgcolor: 'warning.light',
                        }}
                    >
                        <ThumbDownRoundedIcon
                            sx={{ color: 'common.white', fontSize: 60 }}
                        />
                    </Paper>
                    <Typography variant="h3">5 из 20</Typography>
                </Box>

                <Divider sx={{ mt: 3, mb: 1 }} />
                <Typography>Завершенные задачи</Typography>
            </Paper>
        </Box>
    );
};
