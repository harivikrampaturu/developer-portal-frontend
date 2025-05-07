import { createSlice } from '@reduxjs/toolkit';
import { deleteUpload, fetchUploads, uploadFile } from './uploadThunks';

interface Upload {
  _id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadDate: string;
}

interface UploadState {
  uploadedFiles: Upload[];
  total: number;
  loading: boolean;
  error: string | null;
  selectedConfig: string;
}

const initialState: UploadState = {
  uploadedFiles: [],
  total: 0,
  loading: false,
  error: null,
  selectedConfig: 'mvns',
};


const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedConfig: (state, action) => {
      state.selectedConfig = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUploads.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUploads.fulfilled, (state, action) => {
        state.uploadedFiles = action.payload.data;
        state.total = action.payload.totalCount;
        state.loading = false;
      })
      .addCase(fetchUploads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle upload file
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadFile.fulfilled, (state) => {
        // state.uploadedFiles.push(action.payload);
        state.loading = false;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle delete
      .addCase(deleteUpload.fulfilled, (state, action) => {
        state.uploadedFiles = state.uploadedFiles.filter(
          (upload) => upload._id !== action.payload
        );
      });
  },
});

export const { clearError, setSelectedConfig } = uploadSlice.actions;
export default uploadSlice.reducer; 