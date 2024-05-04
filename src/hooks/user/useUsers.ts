import { useQuery } from '@tanstack/react-query';
import { fetchUser, fetchUsers, getProductsByUser } from '../../api/api';
import { User } from '../../types/User';
import { Product } from '../../types/Product';

export const useFetchUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: () =>
      fetchUsers().then((response) => {
        if (response.status !== 200) {
          throw new Error('API fetch error');
        }
        return response.data;
      }),
  });
};

export const useFetchUser = (id: number) => {
  return useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: () =>
      fetchUser(id).then((response) => {
        if (response.status !== 200) {
          throw new Error('API fetch error');
        }
        return response.data;
      }),
  });
};

export const useHardwarePartsByUser = (userId: number) => {
  if (userId === -1) {
    return { isLoading: false, isError: false, data: [] };
  }
  return useQuery<User, Error, Product[]>({
    queryKey: ['user', userId, 'hardwareParts'],
    queryFn: () =>
      getProductsByUser(userId).then((response) => {
        return response;
      }),
  });
};
