'use client';

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectEmail, selectToken } from '@/store/auth';
import { useEffect, useState } from 'react';
import SideNavbar from '@/components/SideNavbar/SideNavbar';
import { styled } from '@mui/material/styles';
import { setDefaultAuthorizationHeader } from '@/utils/axios';

const LayoutWrapper = styled('div')({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
  position: 'relative',
});

const MainContent = styled('main')<{ sidebarOpen: boolean }>(({ theme, sidebarOpen }) => ({
  flex: 1,
  marginLeft: sidebarOpen ? '280px' : '64px',
  width: `calc(100% - ${sidebarOpen ? '280px' : '64px'})`,
  minHeight: '100vh',
  transition: 'all 0.3s ease',
  padding: '20px',
  backgroundColor: theme.palette.background.default,
  boxSizing: 'border-box',
}));

export default function LayoutAuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const token = useSelector(selectToken);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
    }
    console.log('setting token ==>', token);
    setDefaultAuthorizationHeader(token || '');
    setIsLoading(false);
  }, [token, router]);

  if (!token || isLoading) {
    return null;
  }

  return (
    <LayoutWrapper>
      <SideNavbar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <MainContent sidebarOpen={isSidebarOpen}>
        {children}
      </MainContent>
    </LayoutWrapper>
  );
} 