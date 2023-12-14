import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteHardwarePart } from '../api/api';

export const useDeleteHardwarePart = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (id) =>
      deleteHardwarePart(id).then((response) => {
        if (response.status !== 200 && response.status !== 204) {
          throw new Error('API mutation error');
        }
      }),
    onSuccess: () => {
      // Invalidate the hardware parts list query to trigger a refetch
      queryClient.invalidateQueries({
        queryKey: ['hardwareParts'],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
