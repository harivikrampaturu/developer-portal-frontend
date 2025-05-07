import { styled } from '@mui/material/styles';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

interface NavWrapperProps {
  isOpen: boolean;
}
interface StyledListItemProps {
  active?: boolean;
  isOpen?: boolean;
}

export const NavWrapper = styled('nav')<NavWrapperProps>(({ theme, isOpen }) => ({
  width: isOpen ? '280px' : '72px',
  transition: 'width 0.3s ease',
  backgroundColor: theme.custom.sidebar,
  height: '100vh',
  borderRight: `1px solid ${theme.custom.border}`,
  position: 'fixed',
  left: 0,
  top: 0,
  zIndex: 1200,
  display: 'flex',
  flexDirection: 'column',
  padding: '16px 0',
}));

export const LogoContainer = styled('div')<NavWrapperProps>(({ isOpen }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: isOpen ? '8px 20px' : '8px 0',
  minHeight: '60px',
  img: {
    width: isOpen ? '140px' : '40px',
    height: 'auto',
    transition: 'all 0.3s ease',
  }
}));

export const StyledList = styled(List)({
  padding: '8px 12px',
  flex: 1,
});

export const StyledListItem = styled(ListItem)<StyledListItemProps>(({ theme, active, isOpen }) => ({
  padding: isOpen ? '10px 16px' : '10px 8px',
  marginBottom: '4px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  backgroundColor: active ? `${theme.palette.primary.main}15` : 'transparent',
  '& .MuiListItemIcon-root': {
    color: active ? theme.palette.primary.main : theme.palette.text.secondary,
    minWidth: isOpen ? '40px' : '32px',
  },
  '& .MuiListItemText-root .MuiTypography-root': {
    color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.main + '10',
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
    '& .MuiListItemText-root': {
      color: theme.palette.primary.main,
    }
  },
}));

export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: '40px',
  color: theme.palette.text.secondary,
  transition: 'color 0.2s ease',
}));

export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  margin: 0,
  '& .MuiTypography-root': {
    fontSize: '1rem',
    fontWeight: 500,
    color: theme.palette.text.secondary,
    transition: 'color 0.2s ease',
    lineHeight: 1.5,
    letterSpacing: '0.15px'
  }
}));

export const ToggleButton = styled('button')(({ theme }) => ({
  position: 'absolute',
  right: '-12px',
  top: '6rem',
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.divider}`,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  zIndex: 1300,
  boxShadow: theme.shadows[2],
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
  },
}));
