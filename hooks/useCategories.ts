import { useQuery } from '@tanstack/react-query';
import { Categories } from '@/types';
import { fetchCategoriesAll } from '@/lib/api/categoryApi';

export const useCategories = () => {
  const { data, isLoading, error, ...rest } = useQuery<Categories[], Error>({
    retry: 3,
    queryKey: ['categories'],
    queryFn: async () => await fetchCategoriesAll(),
    staleTime: 60 * 60 * 1000, // 60s
  });

  return { data, isLoading, error, ...rest };
};
