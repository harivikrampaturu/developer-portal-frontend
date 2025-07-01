'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Paper, Snackbar, Typography, Box } from '@mui/material';
import { CreateAPIKeyModal } from '@/components/modals/CreateAPIKeyModal';
import { selectApiKeys, selectApiKeysLoading, selectApiKeysError } from '@/store/apiKeys/apiKeysSelectors';
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
                    if (response.payload === 'Invalid or expired token.') {
                        setShowAlert(true);
                        setShouldRedirect(true); // redirect after snackbar
                    }
                }
            } catch (error) {
                console.error('Failed to fetch API keys:', error);
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
        <Box
            sx={{
                p: { xs: 2, sm: 3, md: 4 },
                maxWidth: '1200px',
                mx: 'auto'
            }}
        >
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
                <Alert variant="filled" severity="error" sx={{ width: '100%' }}>
                    Cookie expired, redirecting to login...
                </Alert>
            </Snackbar>

            {isLoading ? (
                <div>Loading...</div>
            ) : error && !showAlert ? (
                <div>Error: {error}</div>
            ) : (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: { xs: 3, sm: 4 }
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: { xs: '1.75rem', sm: '2.125rem', md: '3rem' },
                                    color: 'primary.main'
                                }}
                            >
                                API Keys
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'text.secondary',
                                    mt: 1,
                                    fontSize: { xs: '1rem', sm: '1.125rem' }
                                }}
                            >
                                Manage your API keys for accessing the platform.
                            </Typography>
                        </Box>
                        <Button variant="contained" onClick={() => setIsCreateModalOpen(true)} startIcon={<AddIcon />}>
                            Create New Key
                        </Button>
                    </Box>

                    {apiKeys?.length === 0 ? (
                        <Paper className="flex flex-col items-center justify-center py-12 px-4">
                            <VpnKeyIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                            <h3 className="text-lg font-medium mb-2">No API Keys</h3>
                            <p className="text-center mb-4 text-gray-500">
                                You haven&apos;t created any API keys yet. Create one to get started.
                            </p>
                            <Button variant="outlined" onClick={() => setIsCreateModalOpen(true)}>
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

                    <CreateAPIKeyModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
                </>
            )}
        </Box>
    );
}
