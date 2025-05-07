import { Box, Typography, styled } from '@mui/material';

export const StyledCard = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'light' 
    ? 'linear-gradient(145deg, #ffffff 0%, #f5f7ff 100%)'
    : 'linear-gradient(145deg, #312D4B 0%, #28243D 100%)',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(3),
  height: '100%',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
    background: theme.palette.mode === 'light'
      ? 'linear-gradient(145deg, #ffffff 0%, #eef2ff 100%)'
      : 'linear-gradient(145deg, #312D4B 0%, #28243D 100%)',
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
  '&:hover': {
    transform: 'rotate(5deg)',
    boxShadow: `0 6px 20px ${theme.palette.primary.main}60`,
  }
}));

export const ConfigTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
  fontSize: '1.1rem',
  lineHeight: 1.3,
  marginTop: theme.spacing(1),
  transition: 'color 0.3s ease',
  '&:hover': {
    color: theme.palette.primary.main,
  }
})); 