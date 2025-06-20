// import getProduct from '@/actions/get-productBySlug';
// import { useQuery } from '@tanstack/react-query';
// import { ProductResponse } from '@/types';

// export const useProduct = (slug: string) => {
//   const { data, isLoading, error, ...rest } = useQuery<ProductResponse[], Error>({
//     queryKey: ['products'],
//     queryFn: async () => [await getProduct({ slug })],
//     staleTime: 60 * 1000, // 60s
//   });

//   return { data, isLoading, error, ...rest };
// };
