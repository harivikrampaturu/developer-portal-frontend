'use client';

import { Box, Typography, useTheme } from '@mui/material';

export default function Home() {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      <Typography 
        variant="h4" 
        sx={{ 
          color: theme.palette.text.primary,
          mb: 2 
        }}
      >
        Welcome to Developer Portal
      </Typography>
    </Box>
  );
}
