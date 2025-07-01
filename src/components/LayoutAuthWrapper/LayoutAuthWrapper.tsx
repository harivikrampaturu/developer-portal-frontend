'use client';

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectToken } from '@/store/auth';
import { useEffect, useState } from 'react';
import SideNavbar from '@/components/SideNavbar/SideNavbar';
import { styled } from '@mui/material/styles';
import { setDefaultAuthorizationHeader } from '@/utils/axios';
import { useMediaQuery, useTheme } from '@mui/material';

const LayoutWrapper = styled('div')({
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
    position: 'relative'
});

const MainContent = styled('main')<{ sidebarOpen: boolean; isMobile: boolean }>(({ theme, sidebarOpen, isMobile }) => ({
    flex: 1,
    marginLeft: isMobile ? '0' : sidebarOpen ? '280px' : '80px',
    width: isMobile ? '100%' : `calc(100% - ${sidebarOpen ? '280px' : '80px'})`,
    minHeight: '100vh',
    transition: 'all 0.3s ease',
    padding: isMobile ? '16px' : '20px',
    backgroundColor: theme.palette.background.default,
    boxSizing: 'border-box',
    [theme.breakpoints.down('md')]: {
        padding: '16px',
        marginLeft: '0',
        width: '100%'
    }
}));

const MobileOverlay = styled('div')<{ isOpen: boolean }>(({ theme, isOpen }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1099,
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transition: 'opacity 0.3s ease, visibility 0.3s ease',
    [theme.breakpoints.up('md')]: {
        display: 'none'
    }
}));

export default function LayoutAuthWrapper({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const token = useSelector(selectToken);
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Auto-close sidebar on mobile by default
    useEffect(() => {
        if (isMobile) {
            setIsSidebarOpen(false);
        } else {
            setIsSidebarOpen(true);
        }
    }, [isMobile]);

    useEffect(() => {
        // Get token from cookie first
        const getCookieToken = () => {
            const cookies = document.cookie.split(';');
            const jwtCookie = cookies.find((cookie) => cookie.trim().startsWith('jwt-dev='));
            return jwtCookie ? jwtCookie.split('=')[1] : null;
        };

        const cookieToken = getCookieToken();

        if (cookieToken) {
            // We have a token in cookie, set it up
            setDefaultAuthorizationHeader(cookieToken);
            setIsLoading(false);
        } else if (!token) {
            // No token in cookie and no token in Redux, redirect to login
            router.push('/auth/login');
        } else {
            // We have a token in Redux
            setDefaultAuthorizationHeader(token);
            setIsLoading(false);
        }
    }, [token, router]);

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleOverlayClick = () => {
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    };

    if (isLoading) {
        return null;
    }

    return (
        <LayoutWrapper>
            <SideNavbar isOpen={isSidebarOpen} onToggle={handleSidebarToggle} isMobile={isMobile} />
            <MobileOverlay isOpen={isSidebarOpen && isMobile} onClick={handleOverlayClick} />
            <MainContent sidebarOpen={isSidebarOpen} isMobile={isMobile}>
                {children}
            </MainContent>
        </LayoutWrapper>
    );
}
