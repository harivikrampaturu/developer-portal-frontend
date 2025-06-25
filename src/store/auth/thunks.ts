
import { setDefaultAuthorizationHeader } from '@/utils/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/utils/axios';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}


export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/authentication/login', credentials, {withCredentials: true} );
      setDefaultAuthorizationHeader(response.data.token);
      console.log(response.data.token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const userDetails = createAsyncThunk(
  'users/me',
  async (_, {rejectWithValue}) => {
    try {
      const response = await api.get('/auth/v1/users/me', {
        withCredentials: true,
      });
      console.log("User data", response);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'User Details not found');
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await api.post('/authentication/users', userData,  {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
); 

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/authentication/logout', {withCredentials: true});
      setDefaultAuthorizationHeader('');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);
