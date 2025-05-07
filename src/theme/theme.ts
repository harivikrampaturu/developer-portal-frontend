import { createTheme, PaletteOptions, Components, Theme, Palette } from '@mui/material/styles';

const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#2563eb',
    light: '#60a5fa',
    dark: '#1d4ed8',
  },
  secondary: {
    main: '#0ea5e9',
    light: '#38bdf8',
    dark: '#0284c7',
  },
  text: {
    primary: '#1e293b',
    secondary: '#475569',
  },
  background: {
    default: '#F8F7FA',
    paper: '#FFFFFF',
  },
  grey: {
    50: '#F8F7FA',
    100: '#F4F4F6',
    200: '#EBEDF0',
    300: '#DFDFE3',
    400: '#C9C9CF',
    500: '#AEAEB5',
    600: '#89899A',
    700: '#6E6B7B',
    800: '#504B5A',
    900: '#4B465C',
  },
  divider: 'rgba(75, 70, 92, 0.12)',
};

const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#7367F0',
    light: '#9E95F5',
    dark: '#5E50EE',
  },
  secondary: {
    main: '#a78bfa',
    light: '#c4b5fd',
    dark: '#8b5cf6',
  },
  text: {
    primary: '#D0D2D6',
    secondary: '#A6A8B1',
  },
  background: {
    default: '#28243D',
    paper: '#312D4B',
  },
  divider: 'rgba(231, 227, 252, 0.12)',
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
            backgroundColor: theme.palette.primary.dark,
          },
        },
      }),
    },
  },
  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 8,
        backgroundColor: theme.palette.mode === 'dark' ? '#312D4B' : '#fff',
        border: `1px solid ${theme.palette.divider}`,
      }),
    },
  },
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#312D4B' : '#fff',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 12,
      }),
    },
  },
  MuiTextField: {
    defaultProps: {
    },
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiOutlinedInput-root': {
          borderRadius: 8,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.mode === 'light' 
              ? theme.palette.grey[400]
              : theme.palette.grey[700],
          },
        },
      }),
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderBottom: `1px solid ${theme.palette.divider}`,
      }),
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        fontSize: '1.25rem',
        fontWeight: 600,
      },
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.mode === 'dark' ? theme.palette.primary.main : 'inherit',
        minWidth: '48px',
      }),
    },
  },
  MuiListItemText: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.text.primary,
      }),
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: 2,
        backgroundColor: theme.palette.mode === 'dark' ? '#312D4B' : '#fff',
      }),
    },
  },
};

const typography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: 14,
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 600,
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 600,
  },
  h6: {
    fontSize: '1.4rem',
    fontWeight: 600,
  },
  body1: {
    fontSize: '1.2rem',
  },
  body2: {
    fontSize: '1rem',
  },
  button: {
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.5,
  },
};

const shape = {
  borderRadius: 8,
};

export const lightTheme = createTheme({
  palette: lightPalette,
  components,
  typography,
  shape,
  custom: {
    sidebar: '#F8F7FA',
    border: '#EBEDF0',
    hoverLight: 'rgba(0, 0, 0, 0.04)',
    hoverDark: 'rgba(255, 255, 255, 0.08)',
  },
});

export const darkTheme = createTheme({
  palette: darkPalette,
  components,
  typography,
  shape,
  custom: {
    sidebar: '#28243D',
    border: '#312D4B',
    hoverLight: 'rgba(0, 0, 0, 0.04)',
    hoverDark: 'rgba(255, 255, 255, 0.08)',
  },
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