import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/api';
import { Category } from '../types/Category';

export const useGetCategories = (pageNumber = 1, pageSize = 6) => {
  return useQuery<{ categories: Category[]; nrOfPages: number }, Error>({
    queryKey: ['categories', pageNumber, pageSize],
    queryFn: () =>
      getCategories(pageNumber, pageSize).then((response) => {
        return response;
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
