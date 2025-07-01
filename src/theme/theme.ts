import { createTheme, PaletteOptions, Components, Theme, Palette } from '@mui/material/styles';

const lightPalette: PaletteOptions = {
    mode: 'light',
    primary: {
        main: '#d71920',
        light: '#e74c3c',
        dark: '#a50f15'
    },
    secondary: {
        main: '#333333',
        light: '#4f4f4f',
        dark: '#1a1a1a'
    },
    background: {
        default: '#fafafa',
        paper: '#ffffff'
    },
    text: {
        primary: '#1e1e1e',
        secondary: '#555555'
    },
    divider: 'rgba(0, 0, 0, 0.1)'
};

const darkPalette: PaletteOptions = {
    mode: 'dark',
    primary: {
        main: '#d71920', // Maroon Red
        light: '#f75a5a', // Softer red for hover
        dark: '#a50f15' // Deep red for focus/active
    },
    secondary: {
        main: '#e0e0e0', // Light gray for better contrast
        light: '#f5f5f5',
        dark: '#bdbdbd'
    },
    background: {
        default: '#0a0a0a', // Very dark background
        paper: '#1a1a1a' // Slightly lighter for elevation
    },
    text: {
        primary: '#ffffff', // Pure white for maximum contrast
        secondary: '#cccccc' // Light gray for secondary text
    },
    divider: 'rgba(255, 255, 255, 0.12)'
};

const components: Components<Theme> = {
    MuiButton: {
        styleOverrides: {
            root: ({ theme }) => ({
                borderRadius: 8,
                textTransform: 'none',
                fontWeight: 600,
                padding: '8px 20px',
                lineHeight: 1.5,
                minHeight: '40px',
                minWidth: '64px',
                '&.MuiButton-contained': {
                    backgroundColor: theme.palette.primary.main,
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark
                    }
                }
            })
        }
    },
    MuiPaper: {
        defaultProps: {
            elevation: 0
        },
        styleOverrides: {
            root: ({ theme }) => ({
                borderRadius: 8,
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`
            })
        }
    },
    MuiCard: {
        styleOverrides: {
            root: ({ theme }) => ({
                backgroundColor: theme.palette.background.paper
            })
        }
    },
    MuiTextField: {
        defaultProps: {},
        styleOverrides: {
            root: ({ theme }) => ({
                '& .MuiOutlinedInput-root': {
                    borderRadius: 8,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]
                    }
                }
            })
        }
    },
    MuiTableCell: {
        styleOverrides: {
            root: ({ theme }) => ({
                borderBottom: `1px solid ${theme.palette.divider}`
            })
        }
    },
    MuiDialogTitle: {
        styleOverrides: {
            root: {
                fontSize: '1.25rem',
                fontWeight: 600
            }
        }
    },
    MuiListItemIcon: {
        styleOverrides: {
            root: ({ theme }) => ({
                color: theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.text.primary,
                minWidth: '48px'
            })
        }
    },
    MuiListItemText: {
        styleOverrides: {
            root: ({ theme }) => ({
                color: theme.palette.text.primary,
                '& .MuiListItemText-primary': {
                    fontWeight: 500
                }
            })
        }
    },
    MuiDrawer: {
        styleOverrides: {
            paper: ({ theme }) => ({
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper
            })
        }
    },
    MuiTableRow: {
        styleOverrides: {
            root: ({ theme }) => ({
                '&:nth-of-type(odd)': {
                    backgroundColor:
                        theme.palette.mode === 'light' ? theme.palette.grey[50] : 'rgba(255, 255, 255, 0.02)'
                },
                '&:nth-of-type(even)': {
                    backgroundColor:
                        theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.background.paper
                },
                '&:hover': {
                    backgroundColor: theme.palette.mode === 'light' ? theme.custom.hoverLight : theme.custom.hoverDark,
                    transition: 'background-color 0.2s ease'
                }
            })
        }
    }
};

const typography = {
    fontFamily: '"DM Sans", var(--font-dm-sans), system-ui, -apple-system, sans-serif',
    fontSize: 14,
    h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        fontFamily: '"DM Sans", var(--font-dm-sans), system-ui, -apple-system, sans-serif',
        letterSpacing: '-0.02em'
    },
    h2: {
        fontSize: '2rem',
        fontWeight: 600,
        fontFamily: '"DM Sans", var(--font-dm-sans), system-ui, -apple-system, sans-serif',
        letterSpacing: '-0.01em'
    },
    h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        fontFamily: '"DM Sans", var(--font-dm-sans), system-ui, -apple-system, sans-serif'
    },
    h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        fontFamily: '"DM Sans", var(--font-dm-sans), system-ui, -apple-system, sans-serif'
    },
    h5: {
        fontSize: '1.25rem',
        fontWeight: 500,
        fontFamily: '"DM Sans", var(--font-dm-sans), system-ui, -apple-system, sans-serif'
    },
    h6: {
        fontSize: '1.125rem',
        fontWeight: 500,
        fontFamily: '"DM Sans", var(--font-dm-sans), system-ui, -apple-system, sans-serif'
    },
    body1: {
        fontSize: '1rem',
        fontFamily: '"DM Sans", var(--font-dm-sans), system-ui, -apple-system, sans-serif',
        lineHeight: 1.6
    },
    body2: {
        fontSize: '0.95rem',
        fontFamily: '"DM Sans", var(--font-dm-sans), system-ui, -apple-system, sans-serif',
        lineHeight: 1.5
    },
    button: {
        fontSize: '0.95rem',
        fontWeight: 600,
        fontFamily: '"DM Sans", var(--font-dm-sans), system-ui, -apple-system, sans-serif',
        letterSpacing: '0.01em'
    },
    subtitle1: {
        fontSize: '1rem',
        fontWeight: 500,
        fontFamily: '"DM Sans", var(--font-dm-sans), system-ui, -apple-system, sans-serif',
        lineHeight: 1.5
    },
    subtitle2: {
        fontSize: '0.875rem',
        fontWeight: 500,
        fontFamily: '"DM Sans", var(--font-dm-sans), system-ui, -apple-system, sans-serif',
        lineHeight: 1.4
    }
};

const shape = {
    borderRadius: 8
};

export const lightTheme = createTheme({
    palette: lightPalette,
    components,
    typography,
    shape,
    custom: {
        sidebar: '#F8F7FA',
        border: '#EBEDF0',
        hoverLight: '#fdeaea',
        hoverDark: 'rgba(255, 255, 255, 0.08)'
    }
});

export const darkTheme = createTheme({
    palette: darkPalette,
    components,
    typography,
    shape,
    custom: {
        sidebar: '#1a1a1a',
        border: '#2a2a2a',
        hoverLight: '#fdeaea',
        hoverDark: 'rgba(255, 255, 255, 0.08)'
    }
});

// Add type declaration for custom theme properties
declare module '@mui/material/styles' {
    interface Theme {
        custom: {
            sidebar: string;
            border: string;
            hoverLight: string;
            hoverDark: string;
        };
        palette: Palette;
    }
    interface ThemeOptions {
        custom?: {
            sidebar: string;
            border: string;
            hoverLight: string;
            hoverDark: string;
        };
    }
}
