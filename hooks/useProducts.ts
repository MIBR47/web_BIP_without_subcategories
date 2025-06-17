// import getProductsByName from '@/actions/get-products-by-name';
import { getProductsByName } from '@/lib/api/productApi';
import { ProductResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

interface UseProductsProps {
  search: string;
}

export const useProducts = ({ search }: UseProductsProps) => {
  const [debouncedSearch] = useDebounce(search, 1000); // 1000ms debounce

  const { data, isLoading, error, ...rest } = useQuery<ProductResponse[], Error>({
    queryKey: ['products', debouncedSearch],
    queryFn: async () => {
      try {
        return await getProductsByName({
          search: debouncedSearch,
        });
      } catch (err) {
        throw err;
      }
    },
    retry: 3,
    staleTime: 60 * 60 * 1000, // 1 Jam
    enabled: debouncedSearch !== '',
  });

  return { data, isLoading, error, ...rest };
};
