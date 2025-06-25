'use client';

import React, { useEffect } from 'react';
import { Alert, Box, Snackbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch} from '@/store';
import { fetchUploads } from '@/store/upload/uploadThunks';
import FileList from '@/components/FileUpload/FileList';
import { selectUploadedFiles, selectUploadLoading, selectUploadTotal } from '@/store/upload/uploadSelectors';
import { useRouter } from 'next/navigation';



export default function UploadsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const uploads = useSelector(selectUploadedFiles);
  const total = useSelector(selectUploadTotal);
  const loading = useSelector(selectUploadLoading);
  const router = useRouter();
  const [showAlert, setShowAlert] = React.useState(false);
  const [shouldRedirect, setShouldRedirect] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
          try {
            const response = await dispatch(fetchUploads({ page: 1, limit: 5 }));
            if (response.meta.requestStatus === 'rejected') {
              if (response.payload === "Invalid or expired token.") {
                setShowAlert(true);
                setShouldRedirect(true); // redirect after snackbar
                router.push('/auth/login');
              }
            }
          } catch (error) {
            console.error("Failed to fetch API keys:", error);
          }
        }
        fetchData();
  }, [dispatch, router]);
  

  return (
    <Box sx={{ p: 3 }}>
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
      {uploads.length > 0 ? (
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