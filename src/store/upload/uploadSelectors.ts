import {createSelector} from '@reduxjs/toolkit';
import { RootState } from '@/store/index';

export const selectUploadedFiles = createSelector(
    (state: RootState) => state.upload.uploadedFiles,
    (uploadedFiles) => uploadedFiles
);

export const selectUploadTotal = createSelector(
    (state: RootState) => state.upload.total,
    (total) => total
);

export const selectUploadLoading = createSelector(
    (state: RootState) => state.upload.loading,
    (loading) => loading
);

export const selectUploadError = createSelector(
    (state: RootState) => state.upload.error,
    (error) => error
);

export const selectUploadConfig = createSelector(
    (state: RootState) => state.upload.selectedConfig,
    (selectedConfig) => selectedConfig
);