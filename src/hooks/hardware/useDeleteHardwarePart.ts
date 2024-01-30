import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteHardwarePart } from '../../api/api';

export const useDeleteHardwarePart = () => {
  const queryClient = useQueryClient();

  let idHolder: number;
  return useMutation<void, Error, number>({
    mutationFn: (id) =>
      deleteHardwarePart(id).then((response) => {
        idHolder = id;
        if (response.status !== 200 && response.status !== 204) {
          throw new Error('API mutation error');
        }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['hardwareParts'],
      });
      queryClient.invalidateQueries({
        queryKey: ['hardwarePart', idHolder],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
