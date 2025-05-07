'use client';

import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export const NavWrapper = styled('nav')(({ theme }) => ({
  width: '20rem',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  height: '100vh',
  position: 'sticky',
  top: 0,
  [theme.breakpoints.down('sm')]: {
    width: '5rem',
  },
}));

export const StyledList = styled(List)({
  padding: '1rem 0',
});

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: '1rem 1.5rem',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  [theme.breakpoints.down('sm')]: {
    padding: '1rem',
    justifyContent: 'center',
  },
}));

export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: '3rem',
  color: theme.palette.text.primary,
}));

export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontSize: '1rem',
    color: theme.palette.text.primary,
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
})); 