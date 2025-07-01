'use client';

import { Box, Typography, useTheme, Grid, Card, CardContent, Paper } from '@mui/material';
import { HomeOutlined, UploadOutlined, SettingsOutlined, RadioButtonCheckedOutlined } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

export default function HomeClient() {
    const theme = useTheme();
    const router = useRouter();

    const dashboardItems = [
        {
            title: 'Files',
            description: 'Manage your uploaded files',
            icon: <UploadOutlined sx={{ fontSize: '2rem' }} />,
            color: '#6366F1',
            route: ROUTES.FILES
        },
        {
            title: 'API Keys',
            description: 'View and manage your API keys',
            icon: <SettingsOutlined sx={{ fontSize: '2rem' }} />,
            color: '#10B981',
            route: ROUTES.API_KEYS
        },
        {
            title: 'Recordings',
            description: 'Access your audio recordings',
            icon: <RadioButtonCheckedOutlined sx={{ fontSize: '2rem' }} />,
            color: '#F59E0B',
            route: ROUTES.RECORDING
        }
    ];

    const handleCardClick = (route: string) => {
        router.push(route);
    };

    return (
        <Box
            sx={{
                p: { xs: 2, sm: 3, md: 4 },
                maxWidth: '1200px',
                mx: 'auto'
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    color: theme.palette.text.primary,
                    mb: { xs: 2, sm: 3 },
                    fontSize: { xs: '1.75rem', sm: '2.125rem', md: '3rem' },
                    fontWeight: 600,
                    textAlign: { xs: 'center', sm: 'left' }
                }}
            >
                Welcome to Developer Portal
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    color: theme.palette.text.secondary,
                    mb: { xs: 3, sm: 4 },
                    fontSize: { xs: '1rem', sm: '1.125rem' },
                    textAlign: { xs: 'center', sm: 'left' }
                }}
            >
                Manage your files, API keys, and recordings all in one place.
            </Typography>

            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                {dashboardItems.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            onClick={() => handleCardClick(item.route)}
                            sx={{
                                height: '100%',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: theme.shadows[8],
                                    '&::before': {
                                        opacity: 1
                                    }
                                },
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '3px',
                                    backgroundColor: item.color,
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease'
                                }
                            }}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleCardClick(item.route);
                                }
                            }}
                            aria-label={`Navigate to ${item.title}`}
                        >
                            <CardContent
                                sx={{
                                    p: { xs: 2, sm: 3 },
                                    textAlign: 'center'
                                }}
                            >
                                <Box
                                    sx={{
                                        color: item.color,
                                        mb: 2,
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    {item.icon}
                                </Box>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mb: 1,
                                        fontWeight: 600,
                                        fontSize: { xs: '1.1rem', sm: '1.25rem' }
                                    }}
                                >
                                    {item.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    }}
                                >
                                    {item.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: { xs: 4, sm: 6 } }}>
                <Paper
                    sx={{
                        p: { xs: 2, sm: 3 },
                        backgroundColor:
                            theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(99, 102, 241, 0.05)',
                        border: `1px solid ${
                            theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(99, 102, 241, 0.1)'
                        }`
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 2,
                            fontWeight: 600,
                            fontSize: { xs: '1.1rem', sm: '1.25rem' }
                        }}
                    >
                        Quick Start
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.text.secondary,
                            fontSize: { xs: '0.875rem', sm: '1rem' }
                        }}
                    >
                        Get started by uploading your first file or generating an API key to begin integrating with our
                        services.
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
}
