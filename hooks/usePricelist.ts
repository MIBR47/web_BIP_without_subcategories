import getPricelist from '@/actions/get-pricelist';
import { PriceList } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

export const usePriceList = () => {
  // const [debouncedSearch] = useDebounce(search, 1000); // 500ms debounce

  const { data, isLoading, error, ...rest } = useQuery<PriceList[], Error>({
    queryKey: ['pricelist'],
    queryFn: async () =>
      await getPricelist({ iShowedStatus: true}),
    staleTime: 60 * 60 * 1000, // 60s
    // enabled: debouncedSearch.trim() !== '', // Only run the query if debouncedSearch is not empty
  });

  return { data, isLoading, error, ...rest };
};
