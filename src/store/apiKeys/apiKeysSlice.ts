import { createSlice } from '@reduxjs/toolkit';

import { fetchAPIKeys, createAPIKey, deleteAPIKey } from './apiKeysThunks';

export interface APIKey {
    _id: string;
    name: string;
    key: string;
    isPublic: boolean;
    createdAt: string;
    expiresAt: string;
}

interface APIKeysState {
    items: APIKey[];
    isLoading: boolean;
    error: string | null;
}

const initialState: APIKeysState = {
    items: [],
    isLoading: false,
    error: null
};

const apiKeysSlice = createSlice({
    name: 'apiKeys',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAPIKeys.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAPIKeys.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.data;
            })
            .addCase(fetchAPIKeys.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(createAPIKey.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createAPIKey.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items.push(action.payload.data);
            })
            .addCase(createAPIKey.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteAPIKey.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteAPIKey.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = state.items.filter((key) => key._id !== action.payload);
            })
            .addCase(deleteAPIKey.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }
});

export default apiKeysSlice.reducer;
