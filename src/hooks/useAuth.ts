import { useMutation } from '@tanstack/react-query';
import { login, register } from '../api/api';
import { Severity, useSnackbar } from '../util/SnackbarContext';
import apiClient from '../api/axiosInstance';

let tokenCache: string | null = null;
let tokenTimeout: NodeJS.Timeout | null = null;

export const getToken = () => tokenCache;

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  const snackbar = useSnackbar();
  console.log('Token:', token); // Log the token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (snackbar) {
    snackbar.openSnackbar('No token found', 'error');
  } else {
    console.log('No token found');
  }
  return config;
});

const storeToken = (token: string) => {
  // Store the token in memory
  tokenCache = token;
  // Set a timeout to clear the token after 60 minutes
  if (tokenTimeout) {
    clearTimeout(tokenTimeout);
  }
  tokenTimeout = setTimeout(
    () => {
      tokenCache = null;
    },
    60 * 60 * 1000,
  );
};

export const useRegister = (openSnackbar: (message: string, severity: Severity) => void) => {
  return useMutation<string, Error, { email: string; password: string }>({
    mutationFn: async ({ email, password }) => {
      const token = await register(email, password);
      if (!token) {
        throw new Error('No token returned from server');
      }
      storeToken(token);
      return token;
    },
    onError: (error) => {
      openSnackbar(error.message, 'error');
    },
  });
};

export const useLogin = (openSnackbar: (message: string, severity: Severity) => void) => {
  return useMutation<string, Error, { email: string; password: string }>({
    mutationFn: async ({ email, password }) => {
      const token = await login(email, password);
      if (!token) {
        throw new Error('No token returned from server');
      }
      storeToken(token);
      return token;
    },
    onError: (error) => {
      openSnackbar(error.message, 'error');
    },
  });
};
