import { useMutation } from '@tanstack/react-query';
import { login, refreshToken, register } from '../api/api';
import { storeToken, getToken } from '../api/token';
import apiClient from '../api/axiosInstance';

apiClient.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    const isTokenExpired = false; // TODO: Check if token is expired
    if (isTokenExpired) {
      const newToken = await refreshToken();
      storeToken(newToken);
      config.headers.Authorization = `Bearer ${newToken}`;
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const useRegister = () => {
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
      console.error(error);
    },
  });
};

export const useLogin = () => {
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
      console.error(error);
    },
  });
};

export const useLogout = () => {
  return useMutation<void, Error, void>({
    mutationFn: async () => {
      // Clear the token
      await storeToken('');
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
