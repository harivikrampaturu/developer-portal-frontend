import axios from 'axios';
import qs from 'qs';
import { AppDispatch, RootState } from '@/store/index';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

/**
 * set the default authorization header with the user JWT
 * @param {string} token - User JWT
 */
export const setDefaultAuthorizationHeader = (token: string) => {
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : `Bearer null`;
};

/**
 * axios default interceptor
 * sets the default content-type as application/json for PUT and POST API calls
 * also intercepts error responses to check for expired JWT
 * whenever any API returns 401, trigger logout
 */
export const setAxiosDefaults = () => {
  // sets the content type = application/json
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  // sets the paramsserializer function, which sets array type params to user brackets
  axios.defaults.paramsSerializer = params =>
    qs.stringify(params, { arrayFormat: 'brackets' });
};

export const interceptAxiosResponse = (handleSuccess: any, handleError: any) => {
  api.interceptors.response.use(handleSuccess, handleError);
};

/**
 * (thunk) Initialize an unauthorized error interceptor
 */
export const appInterceptAndParseAxiosResponses = () => (
    dispatch: AppDispatch,
    getState: () => RootState
  ) => {
    
    /**
     *
     * Handles unauthorized errors
     * @param  {Object} error
     */
    const handleError = (error: any) => {
      const tag = 'axios-api-interceptor';
      const stringifiedError = JSON.stringify(error);
    
  
      if (!error || !error.response) {
        console.error(tag, `Unable to parse error: ${stringifiedError}`);
        return;
      }
      const { status, data } = error.response;
      if (status === 401) {
        // log out if the user is already signed in
    
        return Promise.reject(error);
      }
  

  
      // log the provided error if it matches expectations,
      // or log the full error object for additional context
      const errorMessage = data.error || stringifiedError;
      if (status === 400 && errorMessage === 'ERR_CALL_ALREADY_INITED') {
        /* dispatch(
          appHandleNotification('Callback is in progress, please wait...')
        ); */
      } else if (status === 400 || status === 403 || status === 404) {
        return Promise.reject(error);
      }

      return Promise.reject(`${status} - ${errorMessage}`);
    };
  
    /**
     * axios success response interceptor
     * @param {any} response
     */
    const handleSuccess = (response: any) => {
      console.error('response', response);
      return response;
    };
  
    // pass catch-all handleError function to axios interceptor
    interceptAxiosResponse(handleSuccess, handleError);
  };