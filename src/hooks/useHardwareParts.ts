import { useQuery } from '@tanstack/react-query';
import { fetchHardwareParts } from '../api/api';
import { HardwarePart } from '../types/HardwarePart';

export const useHardwareParts = (
  orderBy?: string,
  direction?: string,
  pageNumber?: number,
  minPrice?: number,
  maxPrice?: number,
  textSearch?: string,
  userId?: number,
  category?: string,
) => {
  return useQuery<{ hardwareParts: HardwarePart[]; nrOfPages: number; nrOfElements: number }, Error>({
    queryKey: ['hardwareParts', orderBy, direction, pageNumber, minPrice, maxPrice, textSearch, userId, category],
    queryFn: () =>
      fetchHardwareParts(orderBy, direction, pageNumber, minPrice, maxPrice, textSearch, userId, category).then(
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
