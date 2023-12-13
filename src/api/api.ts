import apiClient from './axiosInstance';
import { HardwarePart } from '../types/HardwarePart';
import { User } from '../types/User';

export const fetchHardwareParts = () => apiClient.get('/hardware');
export const fetchHardwarePart = (id: number) => apiClient.get(`/hardware/${id}`);
export const createHardwarePart = (data: HardwarePart) => apiClient.post('/hardware', data);
export const updateHardwarePart = (id: number, data: HardwarePart) => apiClient.put(`/hardware/${id}`, data);
export const deleteHardwarePart = (id: number) => apiClient.delete(`/hardware/${id}`);
export const fetchUsers = () => apiClient.get('/users');
export const fetchUser = (id: number) => apiClient.get(`/users/${id}`);
export const createUser = (data: User) => apiClient.post('/users', data);
export const updateUser = (id: number, data: User) => apiClient.put(`/users/${id}`, data);
export const deleteUser = (id: number) => apiClient.delete(`/users/${id}`);
export const login = async (email: string, password: string): Promise<string> => {
  const response = await apiClient.post('/login', {
    email,
    password,
  });
  return response.data.token;
};
export const register = async (email: string, password: string): Promise<string> => {
  const response = await apiClient.post('/register', {
    email,
    password,
  });
  return response.data.token;
};
export const logout = async (): Promise<void> => {
  await apiClient.post('/logout');
};
