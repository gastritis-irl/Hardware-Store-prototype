import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/api';
import { Category } from '../types/Category';

export const useGetCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: () =>
      getCategories().then((response) => {
        console.log('response2: ', response);
        return response;
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
