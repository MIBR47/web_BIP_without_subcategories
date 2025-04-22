import axios from 'axios';
import { Products } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface getProductsByNameProps {
  search: string;
}

const getProductsByName = async ({
  search,
}: getProductsByNameProps): Promise<Products[]> => {
  try {
    const URL = `${BASE_URL}/products/search/${search}`;

    const response = await axios.get(URL);

    return response.data;
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

export default getProductsByName;
