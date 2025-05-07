'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { lightTheme, darkTheme } from '@/theme/theme';
import EmotionCache from './EmotionCache';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  return (
    <EmotionCache options={{ key: 'mui' }}>
      <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </EmotionCache>
  );
} 