'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Button, 
  Paper
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

export default function APIKeysPage() {
  const dispatch = useDispatch<AppDispatch>();
  const apiKeys = useSelector(selectApiKeys);
  const isLoading = useSelector(selectApiKeysLoading);
  const error = useSelector(selectApiKeysError);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchAPIKeys());
  }, [dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
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
            You haven't created any API keys yet. Create one to get started.
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
    </div>
  );
}
