import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import FileIcon from '@mui/icons-material/UploadOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  NavWrapper,
  StyledList,
  StyledListItem,
  StyledListItemIcon,
  StyledListItemText,
  ToggleButton,
} from './styled';
import { ROUTES } from '@/constants/routes';
import { LogoContainer } from './styled';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectEmail } from '@/store/auth';

const defaultNavItems = [
  { text: 'Home', icon: <HomeIcon />, href: ROUTES.DASHBOARD },
  { text: 'Files', icon: <FileIcon />, href: ROUTES.FILES },
  { text: 'API Keys', icon: <SettingsIcon />, href: ROUTES.API_KEYS },
  { text: 'Recordings', icon: <FileIcon />, href: ROUTES.RECORDING },
];

interface SideNavbarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const SideNavbar: React.FC<SideNavbarProps> = ({ isOpen, onToggle }) => {
  const pathname = usePathname();
  const email = useSelector(selectEmail);

  let navigationItems = defaultNavItems;

  if (email === 'user@meeamitech.com' || email === 'user@user.com' || email === 'customer@meeamitech.com') {
    navigationItems = defaultNavItems.filter(item => item.text === 'Recordings')

    console.log(navigationItems);
  }

  return (
    <NavWrapper isOpen={isOpen}>
      <ToggleButton onClick={onToggle}>
        {isOpen ? <ChevronLeftIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
      </ToggleButton>
      <LogoContainer isOpen={isOpen}>
        <Image
          src="/logo.svg"
          alt="Materialize Logo"
          width={140}
          height={60}
          priority
        />
      </LogoContainer>
      <StyledList>
        {navigationItems.map((item) => (
          <Link key={item.text} href={item.href || ''} style={{ textDecoration: 'none' }}>
            <StyledListItem isOpen={isOpen} active={pathname === item.href}>
              <StyledListItemIcon>
                {item.icon}
              </StyledListItemIcon>
              {isOpen && <StyledListItemText primary={item.text} />}
            </StyledListItem>
          </Link>
        ))}
      </StyledList>
    </NavWrapper>
  );
};

export default SideNavbar; 