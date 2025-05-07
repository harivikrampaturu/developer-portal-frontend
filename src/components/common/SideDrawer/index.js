'use client';

import React from 'react';
import { Drawer } from '@mui/material';

const SideDrawer = ({ open, onClose, children }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="w-full h-full"> {children}</div>
    </Drawer>
  );
};

export default SideDrawer;
