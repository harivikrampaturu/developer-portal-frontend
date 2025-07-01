import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAudioFiles } from '@/store/audio/audioSlice';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    CircularProgress,
    IconButton
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { RootState, AppDispatch } from '@/store';
import config from '@/config';

const AudioTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items: audioFiles, isLoading, error } = useSelector((state: RootState) => state.audio);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        dispatch(fetchAudioFiles());
    }, [dispatch]);

    const handleDownload = async (filePath: string) => {
        try {
            const response = await fetch(
                `${config.api.baseUrl}/accent/v1/download-signed-url?file=${encodeURIComponent(filePath)}`,
                {
                    method: 'GET',
                    credentials: 'include'
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch the signed URL');
            }

            const { signedUrl } = await response.json();

            const fileResponse = await fetch(signedUrl);
            const blob = await fileResponse.blob();

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filePath.split('/').pop() || 'file.wav';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const processFilePath = (filePath: string) => {
        if (!filePath || typeof filePath !== 'string' || !filePath.includes('/')) {
            return { date: new Date(0), filename: '' };
        }
        const parts = filePath.split('/');
        const rawDate = parts[2] || '';
        const formattedDate = rawDate.replace('_', 'T').replace(/-/g, ':').replace(':', '-');
        const displayDate = new Date(formattedDate);
        const filename = parts[parts.length - 1];
        return { date: displayDate, filename };
    };

    if (isLoading) {
        return <CircularProgress />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Map string array to object array if needed
    const validAudioFiles = (audioFiles || [])
        .map((a, idx) => (typeof a === 'string' ? { id: a, name: a } : a))
        .filter((a) => typeof a.name === 'string' && a.name.includes('/'));
    const sortedAudioFiles = [...validAudioFiles].sort((a, b) => {
        const dateA = processFilePath(a.name).date.getTime();
        const dateB = processFilePath(b.name).date.getTime();
        return dateB - dateA;
    });

    const paginatedData = sortedAudioFiles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date (UTC)</TableCell>
                            <TableCell>Filename</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((audio) => {
                            const { date, filename } = processFilePath(audio.name);
                            const formattedDate = new Intl.DateTimeFormat('en-US', {
                                dateStyle: 'medium',
                                timeStyle: 'short'
                            }).format(date);
                            return (
                                <TableRow key={audio.id}>
                                    <TableCell>{formattedDate}</TableCell>
                                    <TableCell>{filename}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleDownload(audio.name)} color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={sortedAudioFiles.length}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Paper>
    );
};

export default AudioTable;

// Example: in your fetchAudioFiles thunk or reducer
const filesFromBackend = [
    'accent-data/Developer-Portal/2025-06-25 05-18/ip_202506250518.wav'
    // ...
];

const audioFiles = filesFromBackend.map((file, idx) => ({
    id: file, // or use idx or a hash if you want
    name: file
}));
