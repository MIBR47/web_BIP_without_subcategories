import { useQuery } from '@tanstack/react-query';
import { Products } from '@/types';
import getProducts from '@/actions/get-products';

interface useProductCategoryProps {
  category_id: string;
}

export const useProductCategory = ({
  category_id,
}: useProductCategoryProps) => {
  const { data, isLoading, error, ...rest } = useQuery<Products[], Error>({
    queryKey: ['products', category_id],
    queryFn: async () => {
      try {
        const products = await getProducts({
          category_id,
        });
        return products;
      } catch (err) {
        throw new Error('Failed to fetch products');
      }
    },
    retry: 3,
    staleTime: 60 * 60 * 1000,
    enabled: category_id !== '',
  });

  return { data, isLoading, error, ...rest };
};
