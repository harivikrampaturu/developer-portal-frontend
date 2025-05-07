'use client';

import React, { useEffect, useState } from 'react';
import {
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  TablePagination,
  Box,
  Chip,
  ListItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DownloadIcon from '@mui/icons-material/DownloadOutlined';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { deleteUpload, fetchUploads, getById } from '@/store/upload/uploadThunks';
import {
  StyledList,
  ActionBox,
  StyledIconButton,
  LoaderBox,
  PaginationBox,
} from './FileList.styled';
import { styled } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

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

const StyledListItem = styled(ListItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
    transition: 'background-color 0.2s ease',
  },
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const FileList: React.FC<FileListProps> = ({ total = 0, files = [], loading }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchUploads({ page: page + 1, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const handleGetById = async (id: string) => {
    const signedUrl = await dispatch(getById(id));
    const link = document.createElement('a');
    link.href = signedUrl.payload;
    link.download = 'file.wav'; // Set the desired file name
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
    const newLimit = parseInt(event.target.value, 10);
    setRowsPerPage(newLimit);
    setPage(0); // Reset to the first page when rows per page changes
  };

  if (loading) {
    return (
      <LoaderBox>
        <CircularProgress />
      </LoaderBox>
    );
  }

  return (
    <>
      <StyledList>
        {files?.map((file) => (
          <StyledListItem
            key={file._id}
            secondaryAction={
              <ActionBox>
                <StyledIconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteClick(file._id)}
                  color="error"
                >
                  <DeleteIcon />
                </StyledIconButton>
                <StyledIconButton
                  onClick={() => handleGetById(file._id)}
                  color="primary"
                >
                  <DownloadIcon />
                </StyledIconButton>
              </ActionBox>
            }
          >
            <AudioFileIcon 
              sx={{ 
                mr: 4, 
                ml: 2,
                color: 'primary.main',
                fontSize: '2rem' 
              }} 
            />
            <ListItemText
              primary={
                <Typography variant="subtitle1" fontWeight="medium">
                  {file.originalName}
                </Typography>
              }
              secondary={
                <Typography 
                  component="div" 
                  variant="body2" 
                  sx={{ mt: 0.5 }}
                >
                  <Box 
                    component="span" 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 2,
                      flexWrap: 'wrap'
                    }}
                  >
                      <Box 
                      component="span" 
                      sx={{ 
                        color: 'text.secondary',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                      }}
                    >
                      <CalendarTodayIcon sx={{ fontSize: '0.9rem' }} />
                      {new Date(file.updatedAt).toLocaleDateString()}
                    </Box>
                    <Chip
                      label={file.status}
                      size="small"
                      variant='outlined'
                      color={file.status === 'completed' ? 'success' : 'warning'}
                      sx={{
                        fontSize: '0.8rem',
                        textTransform: 'capitalize',
                        borderRadius: '10px',
                        padding: '4px 8px'
                      }}
                    />
                  
                  
                  </Box>
                </Typography>
              }
            />
          </StyledListItem>
        ))}
      </StyledList>

      <PaginationBox>
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </PaginationBox>

      <Dialog 
        open={deleteDialogOpen} 
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 1
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this file?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 1 }}>
          <Button 
            onClick={() => setDeleteDialogOpen(false)}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FileList; 