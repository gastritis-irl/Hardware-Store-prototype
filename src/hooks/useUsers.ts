import { useQuery } from '@tanstack/react-query';
import { fetchUser, fetchUsers } from '../api/api';
import { User } from '../types/User';

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
