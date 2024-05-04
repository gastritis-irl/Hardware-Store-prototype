import { useQuery } from '@tanstack/react-query';
import { fetchProduct } from '../../api/api';
import { Product } from '../../types/Product';

export const useProduct = (id: number) => {
  return useQuery<Product, Error>({
    queryKey: ['hardwarePart', id],
    queryFn: () =>
      fetchProduct(id).then((response) => {
        if (response.status !== 200) {
          throw new Error('API fetch error');
        }
        return response.data;
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
