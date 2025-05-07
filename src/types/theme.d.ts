import '@mui/material/styles';
import '@mui/material/Typography';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      sidebar: string;
      border: string;
    };
  }
  interface ThemeOptions {
    custom?: {
      sidebar: string;
      border: string;
    };
  }
}

// Extend Typography variants if needed
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    code: true;
    subtitle3: true;
  }
}

// Extend Button variants if needed
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    code: true;
  }
}