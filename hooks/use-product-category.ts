import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types';
import { getProducts } from '@/lib/api/productApi';


interface useProductCategoryProps {
  category_id: number;
}

export const useProductCategory = ({
  category_id,
}: useProductCategoryProps) => {
  const { data, isLoading, error, ...rest } = useQuery<Product[], Error>({
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
    enabled: category_id !== 0,
  });

  return { data, isLoading, error, ...rest };
};
