// import { Products, SubCategories } from '@/types';
// import qs from 'query-string';

// const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL2}`;

// interface Query {
//     categoryId: number;
// }
// // http://localhost:5000/api/subcategory/findbycategoryid/1
// const getSubCategories = async (query: Query): Promise<SubCategories[]> => {
//     let url = `${BASE_URL}/subcategory/findbycategoryid`;
//     console.log("test:" + query.categoryId)
//     if (query.categoryId) {
//         url = `${url}/${query.categoryId}`;
//     } else {
//         url = qs.stringifyUrl({
//             url,
//             // query: {
//             //     descriptions: query.descriptions,
//             // },
//         });
//     }
//     console.log("url:" + url)
//     // console.log("desc::" + query.descriptions,)

//     try {
//         const res = await fetch(url);

//         if (!res.ok) {
//             console.error(`Error fetching subcategory: ${res.statusText}`);
//             throw new Error(`Error fetching subcategory: ${res.statusText}`);
//         }

//         const contentType = res.headers.get('content-type');
//         if (!contentType || !contentType.includes('application/json')) {
//             console.error('Response is not JSON:', await res.text());
//             throw new Error('Response is not JSON');
//         }
//         const data = await res.json();
//         console.log(data);
//         return data['data'];
//     } catch (error) {
//         console.error('Failed to fetch product:', error);
//         throw error;
//     }
// };

// export default getSubCategories;
