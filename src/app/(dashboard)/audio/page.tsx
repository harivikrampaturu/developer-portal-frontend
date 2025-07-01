'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';
import AudioTable from '@/components/Audio/AudioTable';

const AudioPage: React.FC = () => {
    return (
        <Box
            sx={{
                p: { xs: 2, sm: 3, md: 4 },
                maxWidth: '1200px',
                mx: 'auto'
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 600,
                    fontSize: { xs: '1.75rem', sm: '2.125rem', md: '3rem' },
                    color: 'primary.main',
                    mb: { xs: 3, sm: 4 }
                }}
            >
                Audio Files
            </Typography>
            <AudioTable />
        </Box>
    );
};

export default AudioPage;
