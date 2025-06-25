import { createTheme, PaletteOptions, Components, Theme, Palette } from '@mui/material/styles';

const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#d71920',
    light: '#e74c3c',
    dark: '#a50f15',
  },
  secondary: {
    main: '#333333',
    light: '#4f4f4f',
    dark: '#1a1a1a',
  },
  background: {
    default: '#fafafa',
    paper: '#ffffff',
  },
  text: {
    primary: '#1e1e1e',
    secondary: '#555555',
  },
  divider: 'rgba(0, 0, 0, 0.1)',
};

const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#d71920',       // Maroon Red
    light: '#f75a5a',      // Softer red for hover
    dark: '#a50f15',       // Deep red for focus/active
  },
  secondary: {
    main: '#c5c5c5',       // Softer gray for contrast
    light: '#f0f0f0',
    dark: '#999999',
  },
  background: {
    default: '#121212',    // Deep black (less strain on eyes)
    paper: '#1e1e1e',      // Slightly lighter than default for elevation
  },
  text: {
    primary: '#ffffff',    // Clean white for contrast
    secondary: '#b0b0b0',  // Dimmed white for subtitles
  },
  divider: 'rgba(255, 255, 255, 0.08)',
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
        backgroundColor: theme.palette.mode === 'dark' ? '#312D4B' : '#fff', // good!
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
  MuiTableRow: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor:
            theme.palette.mode === 'light'
              ? theme.palette.grey[50]
              : theme.palette.background.default,
        },
        '&:nth-of-type(even)': {
          backgroundColor:
            theme.palette.mode === 'light'
              ? theme.palette.common.white
              : theme.palette.background.paper,
        },
        '&:hover': {
          backgroundColor:
            theme.palette.mode === 'light'
              ? theme.custom.hoverLight
              : theme.custom.hoverDark,
          transition: 'background-color 0.2s ease',
        },
      }),
    },
  },  
};

const typography = {
  fontFamily: 'var(--font-dm-sans), sans-serif',
  fontSize: 14,
  h1: { fontSize: '2.25rem', fontWeight: 700 },
  h2: { fontSize: '2rem', fontWeight: 600 },
  h3: { fontSize: '1.75rem', fontWeight: 600 },
  h4: { fontSize: '1.5rem', fontWeight: 600 },
  h5: { fontSize: '1.25rem', fontWeight: 500 },
  h6: { fontSize: '1.125rem', fontWeight: 500 },
  body1: { fontSize: '1rem' },
  body2: { fontSize: '0.95rem' },
  button: { fontSize: '0.95rem', fontWeight: 600 },
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
    hoverLight: '#fdeaea',
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
    hoverLight: '#fdeaea',
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