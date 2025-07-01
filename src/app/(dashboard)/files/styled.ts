import { Box, Typography, styled } from '@mui/material';

export const StyledCard = styled(Box)(({ theme }) => ({
    background: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius * 1.5,
    padding: theme.spacing(3),
    height: '100%',
    boxShadow: theme.shadows[2],
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    border: `1px solid ${theme.palette.divider}`,
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
        backgroundColor: theme.palette.primary.main,
        opacity: 0,
        transition: 'opacity 0.3s ease'
    }
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    color: 'white',
    padding: theme.spacing(2),
    borderRadius: '50%',
    marginBottom: theme.spacing(2),
    boxShadow: `0 4px 14px ${theme.palette.primary.main}40`,
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: `0 6px 20px ${theme.palette.primary.main}60`
    }
}));

export const ConfigTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    color: theme.palette.text.primary,
    fontSize: '1.1rem',
    lineHeight: 1.3,
    marginTop: theme.spacing(1),
    transition: 'color 0.3s ease',
    textAlign: 'center',
    '&:hover': {
        color: theme.palette.primary.main
    }
}));
