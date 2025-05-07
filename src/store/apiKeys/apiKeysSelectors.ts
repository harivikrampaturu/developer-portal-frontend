import { RootState } from '@/types/store';
import { createSelector } from '@reduxjs/toolkit';


export const selectApiKeys = createSelector(
    (state: RootState) => state.apiKeys,
    (apiKeys) => apiKeys?.items,
);

export const selectApiKeysPrivate = createSelector(
    (state: RootState) => state.apiKeys,
    (apiKeys) => apiKeys?.items.filter((key) => key.isPublic === false),
);

export const selectApiKeysPublic = createSelector(
    (state: RootState) => state.apiKeys,
    (apiKeys) => apiKeys?.items.filter((key) => key.isPublic === true),
);

export const selectApiKeysLoading = createSelector(
    (state: RootState) => state.apiKeys,
    (apiKeys) => apiKeys.isLoading,
);

export const selectApiKeysError = createSelector(
    (state: RootState) => state.apiKeys,
    (apiKeys) => apiKeys.error,
);

