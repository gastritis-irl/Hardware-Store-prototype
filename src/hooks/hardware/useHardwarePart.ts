import { useQuery } from '@tanstack/react-query';
import { fetchHardwarePart } from '../../api/api';
import { HardwarePart } from '../../types/HardwarePart';

export const useHardwarePart = (id: number) => {
  return useQuery<HardwarePart, Error>({
    queryKey: ['hardwarePart', id],
    queryFn: () =>
      fetchHardwarePart(id).then((response) => {
        if (response.status !== 200) {
          throw new Error('API fetch error');
        }
        return response.data;
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
