import React from 'react';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import FileIcon from '@mui/icons-material/UploadOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { IconButton, useTheme, List, ListItem, ListItemIcon, ListItemText, Tooltip, Box } from '@mui/material';
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
const NavWrapper = styled('nav')<{ isOpen: boolean; isMobile: boolean }>(({ theme, isOpen, isMobile }) => ({
    width: isOpen ? 280 : 80,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
    transition: 'width 0.3s ease',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 1100,
    backdropFilter: 'blur(10px)',
    boxShadow: theme.palette.mode === 'dark' ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.down('md')]: {
        width: isOpen ? 280 : 0,
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease, width 0.3s ease',
        display: isMobile && !isOpen ? 'none' : 'flex'
    }
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
    position: 'fixed',
    top: 16,
    left: 16,
    zIndex: 1200,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.palette.mode === 'dark' ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
    },
    [theme.breakpoints.up('md')]: {
        display: 'none'
    }
}));

const LogoContainer = styled('div')<{ isOpen: boolean }>(({ theme, isOpen }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    transition: 'all 0.3s ease'
}));

const StyledList = styled(List)(({ theme }) => ({
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    flex: 1
}));

const StyledListItem = styled(ListItem)<{ isOpen: boolean; active: boolean }>(({ theme, active }) => ({
    width: '100%',
    boxSizing: 'border-box',
    padding: theme.spacing(1.5, 2),
    margin: theme.spacing(0.5, 0),
    borderRadius: 12,
    color: active ? theme.palette.primary.main : theme.palette.text.primary,
    backgroundColor: active
        ? theme.palette.mode === 'dark'
            ? 'rgba(215, 25, 32, 0.15)'
            : 'rgba(215, 25, 32, 0.08)'
        : 'transparent',
    borderLeft: active ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(215, 25, 32, 0.04)',
        transform: 'translateX(4px)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
}));

const StyledListItemIcon = styled(ListItemIcon)<{ active: boolean }>(({ theme, active }) => ({
    minWidth: 48,
    color: active ? theme.palette.primary.main : theme.palette.text.primary,
    '& .MuiSvgIcon-root': {
        fontSize: '1.5rem'
    }
}));

const StyledListItemText = styled(ListItemText)<{ active: boolean }>(({ theme, active }) => ({
    fontWeight: 500,
    color: active ? theme.palette.primary.main : theme.palette.text.primary,
    '& .MuiListItemText-primary': {
        fontWeight: active ? 600 : 500,
        fontSize: '1rem',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
}));

const FooterContainer = styled('div')(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper
}));

const Divider = styled('hr')(({ theme }) => ({
    border: 'none',
    height: 1,
    background: `linear-gradient(90deg, transparent, ${
        theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'
    }, transparent)`,
    margin: theme.spacing(1, 0)
}));

// Main Component
interface SideNavbarProps {
    isOpen: boolean;
    onToggle: () => void;
    isMobile: boolean;
}

const SideNavbar: React.FC<SideNavbarProps> = ({ isOpen, onToggle, isMobile }) => {
    const pathname = usePathname();
    const dispatch = useDispatch<AppDispatch>();
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <>
            <MobileMenuButton onClick={onToggle} size="large">
                <MenuIcon />
            </MobileMenuButton>

            <NavWrapper isOpen={isOpen} isMobile={isMobile}>
                <div>
                    <LogoContainer isOpen={isOpen}>
                        <Image
                            src="/meeami-logo-black.jpg"
                            alt="Meeami Logo"
                            width={isOpen ? 200 : 50}
                            height={isOpen ? 60 : 50}
                            priority
                            style={{
                                transition: 'all 0.3s ease',
                                borderRadius: isOpen ? 0 : '8px'
                            }}
                        />
                    </LogoContainer>

                    <StyledList>
                        {navigationItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Tooltip key={item.text} title={!isOpen ? item.text : ''} placement="right" arrow>
                                    <Link href={item.href || ''} style={{ textDecoration: 'none' }}>
                                        <StyledListItem isOpen={isOpen} active={isActive}>
                                            <StyledListItemIcon active={isActive}>{item.icon}</StyledListItemIcon>
                                            {isOpen && <StyledListItemText primary={item.text} active={isActive} />}
                                        </StyledListItem>
                                    </Link>
                                </Tooltip>
                            );
                        })}
                    </StyledList>
                </div>

                <div>
                    <Divider />
                    <FooterContainer>
                        <Profile />
                        <Tooltip title="Toggle theme" placement="top" arrow>
                            <IconButton
                                onClick={() => dispatch(toggleThemeMode())}
                                sx={{
                                    color: isDarkMode ? '#fff' : theme.palette.text.primary,
                                    backgroundColor:
                                        theme.palette.mode === 'dark'
                                            ? 'rgba(255, 255, 255, 0.08)'
                                            : 'rgba(0, 0, 0, 0.04)',
                                    '&:hover': {
                                        backgroundColor:
                                            theme.palette.mode === 'dark'
                                                ? 'rgba(255, 255, 255, 0.12)'
                                                : 'rgba(0, 0, 0, 0.08)',
                                        transform: 'scale(1.05)'
                                    },
                                    transition: 'all 0.2s ease',
                                    width: 40,
                                    height: 40
                                }}
                            >
                                {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                            </IconButton>
                        </Tooltip>
                    </FooterContainer>
                </div>
            </NavWrapper>
        </>
    );
};

export default SideNavbar;
