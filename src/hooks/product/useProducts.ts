import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../api/api';
import { Product } from '../../types/Product';

export const useProducts = (
  orderBy?: string,
  direction?: string,
  pageNumber?: number,
  minPrice?: number,
  maxPrice?: number,
  textSearch?: string,
  userId?: number,
  category?: string,
) => {
  return useQuery<{ products: Product[]; nrOfPages: number; nrOfElements: number }, Error>({
    queryKey: ['products', orderBy, direction, pageNumber, minPrice, maxPrice, textSearch, userId, category],
    queryFn: () =>
      fetchProducts(orderBy, direction, pageNumber, minPrice, maxPrice, textSearch, userId, category).then(
        (response) => {
          if (response.status !== 200) {
            throw new Error('API fetch error');
          }
          return response.data;
        },
      ),
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
