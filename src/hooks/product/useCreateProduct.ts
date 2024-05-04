import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../../api/api';
import { Product } from '../../types/Product';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, Product>({
    mutationFn: (newPart) =>
      createProduct(newPart).then((response) => {
        if (response.status !== 200) {
          throw new Error('API mutation error');
        }
        return response.data;
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['hardwareParts'],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
