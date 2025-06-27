'use client';

import { Box, Typography, useTheme } from '@mui/material';

export default function HomeClient() {
    const theme = useTheme();

    return (
        <Box sx={{ p: 1 }}>
            <Typography variant="h4" sx={{ color: theme.palette.text.primary, mb: 2 }}>
                Welcome to Developer Portal
            </Typography>
        </Box>
    );
}
