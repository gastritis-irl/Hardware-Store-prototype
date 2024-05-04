import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from '../../api/api';

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  let idHolder: number;
  return useMutation<void, Error, number>({
    mutationFn: (id) =>
      deleteProduct(id).then((response) => {
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
