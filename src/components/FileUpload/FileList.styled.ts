import { styled } from '@mui/material/styles';
import { Box, List, ListItem, IconButton } from '@mui/material';

export const StyledList = styled(List)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.palette.divider,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  padding: theme.spacing(2),
  transition: 'all 0.2s ease-in-out',

}));

export const ActionBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  transition: 'transform 0.2s ease-in-out',
  border: `1px solid ${theme.palette.divider}`,
  marginRight: '0.5rem',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

export const LoaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(3),
  width: '100%',
  height: '200px',
  alignItems: 'center',
}));

export const PaginationBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
})); 