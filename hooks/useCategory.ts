import getCategory from '@/actions/get-category';
import { useQuery } from '@tanstack/react-query';
import { Categories } from '@/types';

export const useCategory = (slug: string) => {
  const { data, isLoading, error, ...rest } = useQuery<Categories[], Error>({
    queryKey: ['categories'],
    retry: 3,
    queryFn: async () => [await getCategory({ slug })],
    staleTime: 60 * 60 * 1000, // 60s
    enabled: !!slug, // Only run the query if id is not empty
  });

  return { data, isLoading, error, ...rest };
};
