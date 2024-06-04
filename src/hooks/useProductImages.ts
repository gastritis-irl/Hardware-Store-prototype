// hooks/useProductImages.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Product } from '../types/Product';

const fetchImages = async (hardwareParts: Product[]) => {
  const imageRequests = hardwareParts.map(() =>
    axios.get('https://api.api-ninjas.com/v1/randomimage?category=technology', {
      headers: {
        'X-Api-Key': process.env.API_KEY,
        Accept: 'image/jpg',
      },
    }),
  );

  const imageResponses = await Promise.all(imageRequests);
  return imageResponses.map((response) => response.data);
};

export const useProductImages = (hardwareParts: Product[] | undefined) => {
  return useQuery<string[], Error>({
    queryKey: ['hardwareImages', hardwareParts],
    queryFn: () => fetchImages(hardwareParts!),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!hardwareParts,
  });
};
