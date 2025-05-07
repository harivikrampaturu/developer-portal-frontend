'use client';

import { IconButton, IconButtonProps } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { toggleThemeMode } from '@/store/theme/themeSlice';

interface ThemeToggleProps extends Omit<IconButtonProps, 'onClick'> {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className, ...props }) => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.mode);

  return (
    <IconButton
      {...props}
      className={className}
      onClick={() => dispatch(toggleThemeMode())}
      color="inherit"
    >
      {themeMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}; 