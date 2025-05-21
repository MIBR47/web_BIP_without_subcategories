// import { Categories } from '@/types';
// import qs from 'query-string';

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL2;

// interface Query {
//   slug?: string;
// }

// const getCategory = async (query: Query): Promise<Categories> => {
//   let url = `${BASE_URL}/category/findbyslug`;

//   if (query.slug) {
//     url = `${url}/${query.slug}`;
//   } else {
//     url = qs.stringifyUrl({
//       url,
//       query: {},
//     });
//   }

//   console.log('Fetching category with URL:', url);

//   try {
//     const res = await fetch(url);

//     if (!res.ok) {
//       console.error(`Error fetching category: ${res.statusText}`);
//       throw new Error(`Error fetching category: ${res.statusText}`);
//     }

//     const contentType = res.headers.get('content-type');
//     if (!contentType || !contentType.includes('application/json')) {
//       console.error('Response is not JSON:', await res.text());
//       throw new Error('Response is not JSON');
//     }
//     const data = await res.json();
//     console.log(data);
//     return data['data'];
//   } catch (error) {
//     console.error('Failed to fetch category:', error);
//     throw error;
//   }
// };

// export default getCategory;
