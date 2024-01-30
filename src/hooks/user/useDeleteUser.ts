import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../../api/api';
import { setToken } from '../../api/token';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  let idHolder: number;
  return useMutation({
    mutationFn: (id: number) =>
      deleteUser(id).then((response) => {
        idHolder = id;
        if (response.status !== 200 && response.status !== 204) {
          throw new Error('API mutation error');
        }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
      queryClient.invalidateQueries({
        queryKey: ['user', idHolder],
      });
      queryClient.invalidateQueries({
        queryKey: ['hardwareParts'],
      });
      setToken('');
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
