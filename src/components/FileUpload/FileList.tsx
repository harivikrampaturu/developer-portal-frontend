'use client';

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Chip,
  Typography,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DownloadIcon from '@mui/icons-material/DownloadOutlined';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { deleteUpload, fetchUploads, getById } from '@/store/upload/uploadThunks';
import { useRouter } from 'next/navigation';

interface FileListProps {
  files: Array<{
    _id: string;
    originalName: string;
    fileSize: number;
    status: string;
    updatedAt: string;
    path: string;
  }>;
  total: number;
  loading: boolean;
}

const FileList: React.FC<FileListProps> = ({ total = 0, files = [], loading }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tooltipText, setTooltipText] = useState('Download');
  const [showAlert, setShowAlert] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const router = useRouter();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await dispatch(fetchUploads({ page: page + 1, limit: rowsPerPage }));
          if (response.meta.requestStatus === 'rejected') {
            if (response.payload?.status === 401) {
              setShowAlert(true);
              setShouldRedirect(true);
            }
          }
        } catch (error) {
          console.error("Failed to fetch uploads:", error);
        }
      };
    
      fetchData();
    }, [dispatch, page, rowsPerPage]);

  const handleGetById = async (id: string) => {
    const signedUrl = await dispatch(getById(id));
    setTooltipText('Downloaded');
    setTimeout(() => setTooltipText('Download'), 1500);
    const link = document.createElement('a');
    link.href = signedUrl.payload;
    link.download = 'file.wav';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedFileId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedFileId) {
      await dispatch(deleteUpload(selectedFileId));
      setDeleteDialogOpen(false);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Paper sx={{ padding: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Paper>
    );
  }

  return (
    <>
    <Snackbar
            open={showAlert}
            autoHideDuration={2000}
            onClose={() => {
              setShowAlert(false);
              if (shouldRedirect) {
                router.push('/auth/login');
              }
            }}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            transitionDuration={500}
            sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
          >
            <Alert variant='filled' severity="error" sx={{ width: '100%' }}>
              Cookie expired, redirecting to login...
            </Alert>
          </Snackbar>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell><strong>Filename</strong></TableCell>
              <TableCell><strong>Uploaded At</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file._id}>
                <TableCell>{file.originalName[0].toUpperCase() + file.originalName.substring(1)}</TableCell>
                <TableCell>
                  {new Date(file.updatedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={file.status}
                    size="small"
                    color={file.status === 'completed' ? 'success' : 'warning'}
                    variant="outlined"
                    sx={{ textTransform: 'capitalize' }}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleDeleteClick(file._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                  <Tooltip title={tooltipText} arrow>
                  <IconButton onClick={() => handleGetById(file._id)} color="primary">
                    <DownloadIcon />
                  </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this file?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} variant="outlined">Cancel</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FileList;
