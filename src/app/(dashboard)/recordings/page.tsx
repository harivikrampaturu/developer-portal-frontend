'use client';

import React from 'react';
import AudioTable from '@/components/Audio/AudioTable';
import { Typography } from '@mui/material';

const RecordingsPage: React.FC = () => {
    return (
        <div className="container mx-auto p-6">
            <Typography variant="h4" fontWeight={700} mb={4} color="text.primary">
                Recordings
            </Typography>
            <AudioTable />
        </div>
    );
};

export default RecordingsPage;
