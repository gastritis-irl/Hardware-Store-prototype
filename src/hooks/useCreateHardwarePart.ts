import { useMutation } from '@tanstack/react-query';
import { createHardwarePart } from '../api/api';
import { HardwarePart } from '../types/HardwarePart';

export const useCreateHardwarePart = () => {
  return useMutation<HardwarePart, Error, HardwarePart>({
    mutationFn: (newPart) =>
      createHardwarePart(newPart).then((response) => {
        if (response.status !== 200) {
          throw new Error('API mutation error');
        }
        return response.data;
      }),
  });
};
