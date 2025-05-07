'use client';

import { useEffect } from 'react';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/Providers';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '@/theme/theme';
import { setAxiosDefaults } from '@/utils/axios';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    setAxiosDefaults();
  }, []);

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
} 