import config from '@/config';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Audio {
  id: string;
  name: string;
  duration: string;
  uploadedAt: string;
}

interface AudioState {
  items: Audio[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AudioState = {
  items: [],
  isLoading: false,
  error: null,
};

// Async thunk to fetch audio files
export const fetchAudioFiles = createAsyncThunk(
  'audio/fetchAudioFiles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${config.api.baseUrl}/accent/v1/uploads-file/Developer-Portal`); // Ensure this URL is correct
      return response.data.files; // Ensure the response structure matches this
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch audio files');
    }
  }
);

export const getById = createAsyncThunk(
  'upload/getById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${config.api.baseUrl}/docs/v1/uploads/${id}`, {
        withCredentials: true,
      });
      return response.data.signedUrl; // Ensure this matches the API response
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch signed URL');
    }
  }
);

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAudioFiles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAudioFiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchAudioFiles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default audioSlice.reducer;