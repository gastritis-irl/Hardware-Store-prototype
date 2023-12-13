import { useMutation } from '@tanstack/react-query';
import { deleteHardwarePart } from '../api/api';

export const useDeleteHardwarePart = () => {
  return useMutation<void, Error, number>({
    mutationFn: (id) =>
      deleteHardwarePart(id).then((response) => {
        if (response.status !== 200) {
          throw new Error('API mutation error');
        }
      }),
  });
};
