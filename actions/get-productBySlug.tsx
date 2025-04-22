import { Products } from '@/types';
import qs from 'query-string';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL2}`;

interface Query {
  slug?: string;
  // descriptions?: string;
}
///product/findbyslug/
const getProductBySlug = async (query: Query): Promise<Products> => {
  let url = `${BASE_URL}/product/findbyslug`;
  console.log("des:" + query.slug)
  if (query.slug?.trim()) {
    url = `${url}/${query.slug.trim()}`;
  }
  console.log(url)

  try {
    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      console.error(`Error fetching product: ${res.statusText}`);
      throw new Error(`Error fetching product: ${res.statusText}`);
    }

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Response is not JSON:', await res.text());
      throw new Error('Response is not JSON');
    }
    const product = await res.json();
    console.log(product['data'])
    console.log(res)

    return product['data'];
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw error;
  }
};

export default getProductBySlug;
