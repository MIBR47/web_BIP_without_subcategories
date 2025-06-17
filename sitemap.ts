import { MetadataRoute } from 'next';
import { ProductResponse, Categories } from '@/types';
import { apiUrl, publicUrl } from '@/env.mjs';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  async function getProducts(): Promise<ProductResponse[]> {
    const URL = `${apiUrl}/products`;

    const data = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    return data.result; // Assuming the API returns the result in this format
  }

  async function getCategories(): Promise<Categories[]> {
    const URL = `${apiUrl}/categories`;

    const data = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    return data.result; // Assuming the API returns the result in this format
  }

  const products: ProductResponse[] = await getProducts();
  const categories: Categories[] = await getCategories();

  const filteredProducts = products.filter((product) => product.iShowedStatus);

  const productList = filteredProducts.map((product) => ({
    url: `${publicUrl}/products/${product.slug}`,
    lastModified: new Date(product.updatedAt),
  }));

  const filteredCategories = products.filter(
    (product) => product.iShowedStatus
  );

  const categoryList = filteredCategories.map((category) => ({
    url: `${publicUrl}/categories/${category.slug}`,
    lastModified: new Date(category.updatedAt), // Assuming categories have an updatedAt field
  }));

  return [
    {
      url: `${publicUrl}/`,
      lastModified: new Date(),
    },
    ...productList,
    ...categoryList,
  ];
}
