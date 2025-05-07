import { Snackbar, Alert } from '@mui/material';

interface ErrorNotificationProps {
  error: string | null;
  onClose: () => void;
}

export function ErrorNotification({ error, onClose }: ErrorNotificationProps) {
  return (
    <Snackbar 
      open={!!error} 
      autoHideDuration={6000} 
      onClose={onClose}
    >
      <Alert severity="error" onClose={onClose}>
        {error}
      </Alert>
    </Snackbar>
  );
} 