'use client';

import FileList from './list/page';
import { NoiseAware, SurroundSound, Tune, SettingsVoice } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { StyledCard, IconWrapper, ConfigTitle } from './styled';
import FileUploadModal from '@/components/FileUpload/FileUploadModal';
import { useDispatch } from 'react-redux';
import { setSelectedConfig } from '@/store/upload/uploadSlice';
import type { AppDispatch } from '@/store';

const voiceConfig = [
    {
        name: 'mvns',
        label: 'Multi-Variate Noise Suppression',
        description: 'Advanced noise reduction for multiple audio sources',
        icon: <NoiseAware sx={{ fontSize: '2rem' }} />,
        color: '#6366F1'
    },
    {
        name: 'bvs',
        label: 'Background Voice Suppression',
        description: 'Remove unwanted background voices and sounds',
        icon: <SurroundSound sx={{ fontSize: '2rem' }} />,
        color: '#10B981'
    },
    {
        name: 'mvnsAggressive',
        label: 'Multi-Variate Noise Suppression Aggressive',
        description: 'Intensive noise reduction for challenging environments',
        icon: <Tune sx={{ fontSize: '2rem' }} />,
        color: '#F59E0B'
    },
    {
        name: 'CleanVoice',
        label: 'Clean Voice',
        description: 'Optimize voice clarity and quality',
        icon: <SettingsVoice sx={{ fontSize: '2rem' }} />,
        color: '#EF4444'
    }
];

export default function FilesPage() {
    const [view, setView] = useState<'file-list' | 'upload-config'>('upload-config');
    const dispatch = useDispatch<AppDispatch>();
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const handleViewChange = (view: 'file-list' | 'upload-config') => {
        setView(view);
    };

    const handleFileUpload = (name: string) => {
        setIsUploadModalOpen(true);
        dispatch(setSelectedConfig(name));
    };

    return (
        <Box
            sx={{
                p: { xs: 2, sm: 3, md: 4 },
                maxWidth: '1200px',
                mx: 'auto'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: { xs: 3, sm: 4 }
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 600,
                        fontSize: { xs: '1.75rem', sm: '2.125rem', md: '3rem' },
                        color: 'primary.main'
                    }}
                >
                    Files
                </Typography>
                <Typography
                    variant="body1"
                    onClick={() => handleViewChange(view === 'file-list' ? 'upload-config' : 'file-list')}
                    sx={{
                        cursor: 'pointer',
                        color: 'primary.main',
                        textDecoration: 'underline',
                        display: 'inline-block',
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            textDecoration: 'none',
                            backgroundColor: 'rgba(215, 25, 32, 0.08)'
                        }
                    }}
                >
                    {view === 'file-list' ? 'Back to Upload Files' : 'View Files'}
                </Typography>
            </Box>

            {view === 'file-list' && <FileList />}

            {view === 'upload-config' && (
                <>
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.secondary',
                            mb: { xs: 3, sm: 4 },
                            fontSize: { xs: '1rem', sm: '1.125rem' },
                            textAlign: { xs: 'center', sm: 'left' }
                        }}
                    >
                        Choose an audio processing configuration to get started with your file upload.
                    </Typography>

                    <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                        {voiceConfig.map((config, index) => (
                            <Grid item xs={12} sm={6} md={4} key={config.name}>
                                <StyledCard
                                    onClick={() => handleFileUpload(config.name)}
                                    sx={{
                                        '&::before': {
                                            backgroundColor: config.color
                                        }
                                    }}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            handleFileUpload(config.name);
                                        }
                                    }}
                                    aria-label={`Upload file with ${config.label} configuration`}
                                >
                                    <IconWrapper
                                        sx={{
                                            background: `linear-gradient(135deg, ${config.color} 0%, ${config.color}dd 100%)`,
                                            boxShadow: `0 4px 14px ${config.color}40`,
                                            '&:hover': {
                                                boxShadow: `0 6px 20px ${config.color}60`
                                            }
                                        }}
                                    >
                                        {config.icon}
                                    </IconWrapper>
                                    <ConfigTitle
                                        variant="h6"
                                        sx={{
                                            mb: 1,
                                            fontWeight: 600,
                                            fontSize: { xs: '1.1rem', sm: '1.25rem' }
                                        }}
                                    >
                                        {config.label}
                                    </ConfigTitle>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.secondary',
                                            fontSize: { xs: '0.875rem', sm: '1rem' }
                                        }}
                                    >
                                        {config.description}
                                    </Typography>
                                </StyledCard>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}

            <FileUploadModal open={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
        </Box>
    );
}
