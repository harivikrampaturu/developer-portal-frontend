'use client';

import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch} from '@/store';
import { fetchUploads } from '@/store/upload/uploadThunks';
import FileList from '@/components/FileUpload/FileList';
import { selectUploadedFiles, selectUploadLoading, selectUploadTotal } from '@/store/upload/uploadSelectors';



export default function UploadsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const uploads = useSelector(selectUploadedFiles);
  const total = useSelector(selectUploadTotal);
  const loading = useSelector(selectUploadLoading);
  

  console.log(uploads);

  useEffect(() => {
    dispatch(fetchUploads({ page: 1, limit: 5 }));

  }, [dispatch]);
  

  return (
    <Box sx={{ p: 3 }}>
    {/*   <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Audio Files</Typography>
        <Button 
          variant="contained" 
          onClick={() => setIsUploadModalOpen(true)}
        >
          Upload New File
        </Button>
      </Box> */}

      {uploads.length > 0 ? (
        console.log("function called"),
        <FileList 
          files={uploads}
          total={total}
          loading={loading}
        />
      ) : (
        <Typography variant="h6">No files uploaded yet</Typography>
      )}
      
  
    </Box>
  );
} 