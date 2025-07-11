import { TableRow, TableCell, IconButton, Chip, Stack, Tooltip } from '@mui/material';
import { APIKey } from '@/store/apiKeys/apiKeysSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteAPIKey } from '@/store/apiKeys/apiKeysThunks';
import { AppDispatch } from '@/store';

interface APIKeyTableRowProps {
    apiKey: APIKey;
}

export function APIKeyTableRow({ apiKey }: APIKeyTableRowProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [copied, setCopied] = useState(false);
    const [tooltipText, setTooltipText] = useState('Copy');

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(apiKey.key);
        setCopied(true);
        setTooltipText('Copied');
        setTimeout(() => setTooltipText('Copy'), 1500);
        setTimeout(() => setCopied(false), 2000);
        console.log(copied);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this API key?')) {
            if (apiKey._id) {
                dispatch(deleteAPIKey(apiKey._id));
            }
        }
    };

    return (
        <TableRow>
            <TableCell>{apiKey.name}</TableCell>
            <TableCell>
                <Stack direction="row" spacing={1} alignItems="center">
                    <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">{apiKey.key}</code>
                    <Tooltip title={tooltipText} arrow>
                        <IconButton size="small" onClick={copyToClipboard} sx={{ color: 'text.secondary' }}>
                            <ContentCopyIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </TableCell>
            <TableCell>
                <Chip
                    label={apiKey.isPublic ? 'Public' : 'Private'}
                    size="small"
                    color={apiKey.isPublic ? 'success' : 'secondary'}
                />
            </TableCell>
            <TableCell align="center">
                <IconButton
                    size="small"
                    onClick={handleDelete}
                    sx={{
                        color: 'error.main',
                        '&:hover': {
                            bgcolor: (theme) =>
                                theme.palette.mode === 'dark' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 0, 0, 0.05)'
                        }
                    }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}
