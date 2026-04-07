import { useQuery } from '@tanstack/react-query';
import { productsAPI } from '@/lib/api';

export const useProducts = (params: { category?: string; minPrice?: number; maxPrice?: number } = {}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productsAPI.list(params),
  });
};

