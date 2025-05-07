import { Snackbar, Alert } from '@mui/material';

interface SuccessNotificationProps {
  message: string | null;
  onClose: () => void;
}

export function SuccessNotification({ message, onClose }: SuccessNotificationProps) {
  return (
    <Snackbar 
      open={!!message} 
      autoHideDuration={6000} 
      onClose={onClose}
    >
      <Alert severity="success" onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
} 