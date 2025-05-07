import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FILE_UPLOAD_CONFIG } from '@/constants';
import { RootState } from '@/store/index';
import { selectUploadConfig } from './uploadSelectors';

// Define fetchUploads async thunk
export const fetchUploads = createAsyncThunk(
  'upload/fetchUploads', 
  // Accept parameters to be passed to the action
  async ({ page, limit }: {  page: number; limit: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8500/docs/v1/uploads', {
        params: {
          page: page, // Page starts from 1 on the server-side
          limit,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

  
  export const uploadFile = createAsyncThunk(
    'upload/uploadFile',
    async (file: File, { rejectWithValue, dispatch, getState }) => {
      try {
        debugger;
        const state = getState() as RootState;
        const selectedConfig = selectUploadConfig(state);
        const formData = new FormData();
        formData.append('file', file);

        const config = FILE_UPLOAD_CONFIG[selectedConfig as keyof typeof FILE_UPLOAD_CONFIG] || FILE_UPLOAD_CONFIG.mvns;
        
        // Add logging to debug the FormData content
        console.log('File being uploaded:', file);
        console.log('Config:', config);
        debugger;
        for (const pair of Array.from(formData.entries())) {
          console.log(pair[0], pair[1]);
        }
  
        const response = await axios.post('http://localhost:8500/docs/v1/uploads', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          params: {...config},
          withCredentials: true,
        });
        dispatch(fetchUploads());
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error('Upload error:', error.response?.data);
        return rejectWithValue(error.response?.data);
      }
    }
  );
  
  export const deleteUpload = createAsyncThunk(
    'upload/deleteUpload',
    async (id: string, { rejectWithValue }) => {
      try {
        await axios.delete(`http://localhost:8500/docs/v1/uploads/${id}`,{
          withCredentials: true,
        });
        return id;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const getById = createAsyncThunk(
    'upload/getById',
    async (id: string, { rejectWithValue }) => {
      try {
        const response = await axios.get(`http://localhost:8500/docs/v1/uploads/${id}`, {
          withCredentials: true,
        });
        return response.data?.signedUrl;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );