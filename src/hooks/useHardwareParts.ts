import { useQuery } from '@tanstack/react-query';
import { fetchHardwareParts } from '../api/api';
import { HardwarePart } from '../types/HardwarePart';

export const useHardwareParts = () => {
  return useQuery<HardwarePart[], Error>({
    queryKey: ['hardwareParts'],
    queryFn: () =>
      fetchHardwareParts().then((response) => {
        if (response.status !== 200) {
          throw new Error('API fetch error');
        }
        return response.data;
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
