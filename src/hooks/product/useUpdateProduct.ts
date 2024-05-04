import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '../../api/api';
import { Product } from '../../types/Product';

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, { id: number; part: Product }>({
    mutationFn: ({ id, part }) =>
      updateProduct(id, part).then((response) => {
        if (response.status !== 200) {
          throw new Error('API mutation error');
        }
        return response.data;
      }),
    onSuccess: (part) => {
      queryClient.invalidateQueries({ queryKey: ['hardwareParts'] });
      queryClient.invalidateQueries({ queryKey: ['hardwarePart', part.id] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
