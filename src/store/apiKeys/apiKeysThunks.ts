import { createAsyncThunk } from '@reduxjs/toolkit';
// import { api } from '@/utils/axios';
import axios from 'axios';
import config from '@/config';

export const fetchAPIKeys = createAsyncThunk(
  'apiKeys/fetchAPIKeys',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${config.api.baseUrl}/auth/v1/apikeys`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch API keys');
    }
  }
);

export const createAPIKey = createAsyncThunk(
  'apiKeys/createAPIKey',
  async (data: { name: string; isPublic: boolean; allowedUrls: string[] }, { rejectWithValue }) => {
    try {
      const { data: responseData } = await axios.post(`${config.api.baseUrl}/auth/v1/apikeys`, data, {
        withCredentials: true,
      });
      return responseData;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create API key');
    }
  }
);

export const deleteAPIKey = createAsyncThunk(
  'apiKeys/deleteAPIKey',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${config.api.baseUrl}/auth/v1/apikeys/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete API key');
    }
  }
); 