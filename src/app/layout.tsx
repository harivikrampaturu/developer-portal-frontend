'use client';

import { useEffect } from 'react';
import { DM_Sans } from 'next/font/google';
import { Providers } from '@/components/Providers';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '@/theme/theme';
import { setAxiosDefaults } from '@/utils/axios';
import './(dashboard)/globals.css';

const dmSans = DM_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-dm-sans'
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        setAxiosDefaults();
    }, []);

    return (
        <html lang="en" className={dmSans.variable}>
            <body>
                <ThemeProvider theme={lightTheme}>
                    <CssBaseline />
                    <Providers>{children}</Providers>
                </ThemeProvider>
            </body>
        </html>
    );
}
