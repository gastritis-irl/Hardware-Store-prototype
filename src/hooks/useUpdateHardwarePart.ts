import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateHardwarePart } from '../api/api';
import { HardwarePart } from '../types/HardwarePart';

export const useUpdateHardwarePart = () => {
  const queryClient = useQueryClient();

  return useMutation<HardwarePart, Error, { id: number; part: HardwarePart }>({
    mutationFn: ({ id, part }) =>
      updateHardwarePart(id, part).then((response) => {
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
