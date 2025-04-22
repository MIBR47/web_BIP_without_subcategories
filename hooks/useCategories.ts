import getCategories from '@/actions/get-categories';
import { useQuery } from '@tanstack/react-query';
import { Categories } from '@/types';

export const useCategories = () => {
  const { data, isLoading, error, ...rest } = useQuery<Categories[], Error>({
    retry: 3,
    queryKey: ['categories'],
    queryFn: async () => await getCategories(),
    staleTime: 60 * 60 * 1000, // 60s
  });

  return { data, isLoading, error, ...rest };
};
