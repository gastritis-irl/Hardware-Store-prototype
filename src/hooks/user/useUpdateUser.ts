import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '../../types/User';
import { updateUser } from '../../api/api';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, { id: number; user: User }>({
    mutationFn: ({ id, user }) =>
      updateUser(id, user).then((response) => {
        if (response.status !== 200) {
          throw new Error('API mutation error');
        }
        return response.data;
      }),
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', user.id] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
