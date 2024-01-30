import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createHardwarePart } from '../../api/api';
import { HardwarePart } from '../../types/HardwarePart';

export const useCreateHardwarePart = () => {
  const queryClient = useQueryClient();

  return useMutation<HardwarePart, Error, HardwarePart>({
    mutationFn: (newPart) =>
      createHardwarePart(newPart).then((response) => {
        if (response.status !== 200) {
          throw new Error('API mutation error');
        }
        return response.data;
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['hardwareParts'],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
