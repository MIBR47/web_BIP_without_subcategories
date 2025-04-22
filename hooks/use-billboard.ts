import getCategories from '@/actions/get-categories';
import { useQuery } from '@tanstack/react-query';
import { Billboards } from '@/types';
import getBillboard from '@/actions/get-billboard';

export const useBillboards = () => {
  const { data, isLoading, error, ...rest } = useQuery<Billboards[], Error>({
    queryKey: ['billboard'],
    queryFn: async () => await getBillboard({ iShowedStatus: true }),
    staleTime: 60 * 60 * 1000, // 60s
  });

  return { data, isLoading, error, ...rest };
};
