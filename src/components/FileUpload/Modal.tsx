import React from 'react';
import { Modal as MuiModal, Box } from '@mui/material';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <Box sx={{ /* Add your styles here */ }}>
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal; 