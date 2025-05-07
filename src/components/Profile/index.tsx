'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import { selectUser } from '@/store/auth/selectors';
import { logout } from '@/store/auth/thunks';

export const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await dispatch(logout());
    handleMenuClose();
  };

  console.log('user ==>', user);

  if (!user) return null;

  return (
    <>
      <IconButton
        onClick={handleMenuOpen}
        size="small"
        sx={{ ml: 2 }}
        aria-label="Profile menu"
        aria-controls={Boolean(anchorEl) ? 'profile-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
      >
        <Avatar sx={{ width: 32, height: 32, bgcolor: 'success.main' }}>
          {user.firstName[0].toUpperCase()}
        </Avatar>
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default Profile;
