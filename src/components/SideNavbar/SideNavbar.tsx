import React from 'react';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import FileIcon from '@mui/icons-material/UploadOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { IconButton, useTheme, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import Profile from '../Profile';
import { styled } from '@mui/material/styles';
import { ROUTES } from '@/constants/routes';
import { toggleThemeMode } from '@/store/theme/themeSlice';

const navigationItems = [
    { text: 'Home', icon: <HomeIcon />, href: ROUTES.DASHBOARD },
    { text: 'Files', icon: <FileIcon />, href: ROUTES.FILES },
    { text: 'API Keys', icon: <SettingsIcon />, href: ROUTES.API_KEYS },
    { text: 'Recordings', icon: <RadioButtonCheckedOutlinedIcon />, href: ROUTES.RECORDING }
];

// Styled Components
const NavWrapper = styled('nav')<{ isOpen: boolean }>(({ theme, isOpen }) => ({
    width: isOpen ? 240 : 72,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.custom.border}`,
    transition: 'width 0.3s ease',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 1100
}));

const LogoContainer = styled('div')<{ isOpen: boolean }>(({ isOpen }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 72,
    paddingLeft: isOpen ? 0 : 0
}));

const StyledList = styled(List)({
    paddingTop: 0,
    flex: 1
});

const StyledListItem = styled(ListItem)<{ isOpen: boolean; active: boolean }>(({ theme, active }) => ({
    paddingLeft: 16,
    paddingRight: 16,
    color: active ? theme.palette.primary.main : theme.palette.text.primary,
    backgroundColor: active ? theme.palette.action.selected : 'transparent',
    '&:hover': {
        backgroundColor: '#fdeaea'
    }
}));

const StyledListItemIcon = styled(ListItemIcon)({
    minWidth: 40
});

const StyledListItemText = styled(ListItemText)({
    fontWeight: 500
});

const FooterContainer = styled('div')(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}));

// Main Component
interface SideNavbarProps {
    isOpen: boolean;
    onToggle: () => void;
}

const SideNavbar: React.FC<SideNavbarProps> = ({ isOpen }) => {
    const pathname = usePathname();
    const dispatch = useDispatch<AppDispatch>();
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <NavWrapper isOpen={isOpen}>
            <div>
                <LogoContainer isOpen={isOpen}>
                    <Image src="/meeami-logo-black.jpg" alt="Meeami Logo" width={180} height={60} priority />
                </LogoContainer>

                <StyledList>
                    {navigationItems.map((item) => (
                        <Link key={item.text} href={item.href || ''} style={{ textDecoration: 'none' }}>
                            <StyledListItem isOpen={isOpen} active={pathname === item.href}>
                                <StyledListItemIcon>{item.icon}</StyledListItemIcon>
                                {isOpen && <StyledListItemText primary={item.text} />}
                            </StyledListItem>
                        </Link>
                    ))}
                </StyledList>
            </div>
            <div>
                <hr style={{ border: '1px solid #e5e7eb', width: '100%', marginBottom: '1px' }} />
                <FooterContainer sx={{ mr: 2, mb: 2, px: 0, py: '8px' }}>
                    <Profile />
                    <IconButton
                        onClick={() => dispatch(toggleThemeMode())}
                        sx={{
                            color: isDarkMode ? '#fff' : theme.palette.text.primary,
                            '&:hover': {
                                backgroundColor:
                                    theme.palette.mode === 'light' ? theme.palette.action.hover : theme.custom.hoverDark
                            }
                        }}
                    >
                        {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </FooterContainer>
            </div>
        </NavWrapper>
    );
};

export default SideNavbar;
