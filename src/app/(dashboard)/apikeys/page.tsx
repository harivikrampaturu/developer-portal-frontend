'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  Button,
  Paper,
  Snackbar
} from '@mui/material';
import { CreateAPIKeyModal } from '@/components/modals/CreateAPIKeyModal';
import {
  selectApiKeys,
  selectApiKeysLoading,
  selectApiKeysError
} from '@/store/apiKeys/apiKeysSelectors';
import { fetchAPIKeys } from '@/store/apiKeys/apiKeysThunks';
import { AppDispatch } from '@/store';
import AddIcon from '@mui/icons-material/Add';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { APIKeysTable } from '@/components/ApiKeys/APIKeysTable';
import { useRouter } from 'next/navigation';

export default function APIKeysPage() {
  const dispatch = useDispatch<AppDispatch>();
  const apiKeys = useSelector(selectApiKeys);
  const isLoading = useSelector(selectApiKeysLoading);
  const error = useSelector(selectApiKeysError);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAPIKeys());
        if (response.meta.requestStatus === 'rejected') {
          if (response.payload === "Invalid or expired token.") {
            setShowAlert(true);
            setShouldRedirect(true); // redirect after snackbar
          }
        }
      } catch (error) {
        console.error("Failed to fetch API keys:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="container mx-auto p-6">
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

      {isLoading ? (
        <div>Loading...</div>
      ) : error && !showAlert ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">API Keys</h1>
              <p className="mt-2 text-gray-600">Manage your API keys for accessing the platform.</p>
            </div>
            <Button
              variant="contained"
              onClick={() => setIsCreateModalOpen(true)}
              startIcon={<AddIcon />}
            >
              Create New Key
            </Button>
          </div>

          {apiKeys?.length === 0 ? (
            <Paper className="flex flex-col items-center justify-center py-12 px-4">
              <VpnKeyIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <h3 className="text-lg font-medium mb-2">No API Keys</h3>
              <p className="text-center mb-4 text-gray-500">
                You haven’t created any API keys yet. Create one to get started.
              </p>
              <Button
                variant="outlined"
                onClick={() => setIsCreateModalOpen(true)}
              >
                Create Your First Key
              </Button>
            </Paper>
          ) : (
            <APIKeysTable
              apiKeys={apiKeys}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}

          <CreateAPIKeyModal
            open={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
          />
        </>
      )}
    </div>
  );
}
