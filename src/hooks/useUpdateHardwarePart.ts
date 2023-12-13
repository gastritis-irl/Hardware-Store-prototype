import { useMutation } from '@tanstack/react-query';
import { updateHardwarePart } from '../api/api';
import { HardwarePart } from '../types/HardwarePart';

export const useUpdateHardwarePart = () => {
  return useMutation<HardwarePart, Error, { id: number; part: HardwarePart }>({
    mutationFn: ({ id, part }) =>
      updateHardwarePart(id, part).then((response) => {
        if (response.status !== 200) {
          throw new Error('API mutation error');
        }
        return response.data;
      }),
  });
};
