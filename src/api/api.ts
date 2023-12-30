import axios from 'axios';
import { HardwarePart } from '../types/HardwarePart';
import { User } from '../types/User';
import { AuthEntity } from '../types/AuthEntity';
import { getToken, setToken } from './token';

const apiClient = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: { 'Content-Type': 'application/json' },
});

export const randomImage = () =>
  axios.get('https://api.api-ninjas.com/v1/randomimage?category=technology', {
    headers: {
      'X-Api-Key': process.env.API_KEY,
      Accept: 'image/jpg',
    },
  });
export const fetchHardwareParts = (
  orderBy?: string,
  direction?: string,
  pageNumber?: number,
  minPrice?: number,
  maxPrice?: number,
  textSearch?: string,
  userId?: number,
) => {
  let url = '/hardware';
  const params = new URLSearchParams();

  if (orderBy) params.append('orderBy', orderBy);
  if (direction) params.append('direction', direction);
  if (pageNumber) params.append('pageNumber', pageNumber.toString());
  if (minPrice) params.append('MinPrice', minPrice.toString());
  if (maxPrice) params.append('MaxPrice', maxPrice.toString());
  if (textSearch) params.append('TextSearch', textSearch);
  if (userId) params.append('userId', userId.toString());

  if (params.toString()) url += `?${params.toString()}`;

  return apiClient.get(url);
};
export const fetchHardwarePart = (id: number) => apiClient.get(`/hardware/${id}`);
export const createHardwarePart = (data: HardwarePart) => apiClient.post('/hardware', data);
export const updateHardwarePart = (id: number, data: HardwarePart) => apiClient.put(`/hardware/${id}`, data);
export const deleteHardwarePart = (id: number) => apiClient.delete(`/hardware/${id}`);
export const fetchUsers = () => apiClient.get('/user');
export const fetchUser = (id: number) => apiClient.get(`/user/${id}`);
export const createUser = (data: User) => apiClient.post('/user', data);
export const updateUser = (id: number, data: User) => apiClient.put(`/user/${id}`, data);
export const deleteUser = (id: number) => apiClient.delete(`/user/${id}`);
const authenticateUser = async (endpoint: string, email: string, password: string): Promise<AuthEntity | null> => {
  const response = await apiClient.post(endpoint, {
    email,
    password,
  });
  let res: AuthEntity | null = null;
  if (response.data) {
    if (response.data === 'Invalid credentials') {
      console.log('Invalid credentials');
      throw new Error('Invalid credentials');
    }
    res = response.data;
  } else {
    console.log('No token found in response body');
    throw new Error('No token found in response body');
  }
  return res;
};

export const login = (email: string, password: string): Promise<AuthEntity | null> => {
  return authenticateUser('/login', email, password);
};

export const register = (email: string, password: string): Promise<AuthEntity | null> => {
  return authenticateUser('/register', email, password);
};
export const logout = async (): Promise<void> => {
  await apiClient.post('/logout');
};

export const refreshToken = async () => {
  const response = await apiClient.post('/refresh-token');
  return response.data;
};

export const getHardwarePartsByUser = async (userId: number) => {
  const response = await apiClient.get(`/user/${userId}/hardware`);
  return response.data;
};

apiClient.interceptors.request.use((config) => {
  const currentToken = getToken(); // Retrieve the current token
  console.log('currentToken: ', currentToken);
  if (currentToken) {
    config.headers.Authorization = `Bearer ${currentToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest.retry) {
      originalRequest.retry = true;
      const newToken = await refreshToken();
      if (newToken) {
        setToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);
