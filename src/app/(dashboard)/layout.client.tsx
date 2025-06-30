'use client';

import { Inter } from 'next/font/google';
import { Box } from '@mui/material';
import { Providers } from '@/components/Providers';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import LayoutAuthWrapper from '@/components/LayoutAuthWrapper/LayoutAuthWrapper';
import './globals.css';

// Move Inter font initialization outside the component since it needs to be at module level
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter'
});

// Keep RootLayout as the main layout component
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={inter.variable}>
            <body>
                <Providers>
                    <ThemeRegistry>
                        <LayoutAuthWrapper>
                            <Box
                                component="main"
                                sx={{
                                    flexGrow: 1,
                                    px: { xs: 1, sm: 2, md: 3 }, // Responsive padding
                                    py: { xs: 2, sm: 3 }, // Responsive vertical padding
                                    width: '100%',
                                    minHeight: '100vh',
                                    boxSizing: 'border-box'
                                }}
                            >
                                {/* <AppBar 
                  position="static" 
                  elevation={0}
                
                >
                  <Toolbar sx={{ 
                    height: 70,
                    px: { xs: 2, sm: 4 },
                  }}>
                    <Typography 
                      variant="h6" 
                      component="div" 
                      sx={{ 
                        flexGrow: 1,
                        
                        fontWeight: 600,
                        fontSize: '1.25rem'
                      }}
                    >
                      DevPortal
                    </Typography>
                    <IconButton 
                      onClick={() => dispatch(toggleThemeMode())}
                      sx={{ 
                        mr: 2,
                        color: theme.palette.mode === 'light'
                          ? theme.palette.text.primary
                          : '#fff',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'light'
                            ? theme.palette.action.hover
                            : theme.custom.hoverDark
                        }
                      }}
                    >
                      {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                    <Profile />
                  </Toolbar>
                </AppBar> */}
                                {children}
                            </Box>
                        </LayoutAuthWrapper>
                    </ThemeRegistry>
                </Providers>
            </body>
        </html>
    );
}
