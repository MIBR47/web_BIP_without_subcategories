import axios from 'axios';
import { Products } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL2;

interface GetProductsProps {
  category_id: number;
}

const getProducts = async ({
  category_id,
}: GetProductsProps): Promise<Products[]> => {
  try {
    const URL = `${BASE_URL}/product/findbyid/${category_id}`;
    // console.log(category_id)

    const res = await fetch(URL);
    // console.log(res)
    const data = await res.json();
    console.log(data['data']);

    return data['data'];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || error.message);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

export default getProducts;
