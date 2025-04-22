// import ProductCard from '../_components/productCard';
// import getProducts from '@/actions/get-products';
// import NoResults from '@/components/ui/no-results';

// const TkdnProductPage = async () => {
//   const category_id = 1076; // Initialize with appropriate value
//   const products = await getProducts({ category_id });

//   const tkdnProducts = products.filter(
//     (item) => item.tkdn_pctg > 0 && item.tkdn_pctg <= 100
//   );

//   return (
//     <>
//       <div className='space-y-1'>
//         {tkdnProducts.length === 0 && <NoResults />}
//         <div className='mt-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-32 sm:px-6 '>
//           <h3 className='font-bold text-1xl'>Produk TKDN</h3>
//           <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12'>
//             {tkdnProducts.map((item) => (
//               <div key={item.id}>
//                 <ProductCard key={item.id} data={item} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TkdnProductPage;
