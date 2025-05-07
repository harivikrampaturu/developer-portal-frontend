import { Button, Box, Typography, Stack, Chip, IconButton } from "@mui/material";
import { APIKey } from "@/store/apiKeys/apiKeysSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAPIKey } from "@/store/apiKeys/apiKeysThunks";
import { AppDispatch } from "@/store";
import { useTheme } from "@mui/material/styles";

interface APIKeyCardProps {
  apiKey: APIKey;
}

export function APIKeyCard({ apiKey }: APIKeyCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [copied, setCopied] = useState(false);
  const theme = useTheme();

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(apiKey.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this API key?')) {
      dispatch(deleteAPIKey(apiKey._id));
    }
  };

  return (
    <Box sx={{
      border: 1,
      borderColor: 'divider',
      borderRadius: 1,
      p: 2,
      boxShadow: 1,
      bgcolor: 'background.paper'
    }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Stack spacing={1}>
          <Typography variant="subtitle1" fontWeight="600" color="text.primary">
            {apiKey.name}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              component="code"
              sx={{
                fontSize: '0.875rem',
                color: 'text.secondary',
                fontFamily: 'monospace',
                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                p: 0.5,
                borderRadius: 1
              }}
            >
              {apiKey.key}
            </Typography>
            <IconButton
              size="small"
              onClick={copyToClipboard}
              sx={{ 
                height: 24, 
                width: 24,
                color: 'text.secondary'
              }}
            >
              <ContentCopyIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Chip
            label={apiKey.isPublic ? 'Public' : 'Private'}
            size="small"
            color={apiKey.isPublic ? 'success' : 'secondary'}
            sx={{
              height: 24,
              '& .MuiChip-label': {
                px: 1,
                py: 0.5,
              }
            }}
          />
          <IconButton
            size="small"
            onClick={handleDelete}
            sx={{
              color: 'error.main',
              height: 32,
              width: 32,
              '&:hover': {
                bgcolor: (theme) => theme.palette.mode === 'dark' 
                  ? 'rgba(255, 0, 0, 0.1)' 
                  : 'rgba(255, 0, 0, 0.05)'
              }
            }}
          >
            <DeleteIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
} 