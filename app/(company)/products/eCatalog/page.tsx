// import ProductCard from '../_components/productCard';
// import getProducts from '@/actions/get-products';
// import NoResults from '@/components/ui/no-results';

// const EcatalogProductPage = async () => {
//   const category_id = '1076';
//   const products = await getProducts({ category_id });

//   const eCatalogProducts = products.filter(
//     (item) => item.ecatalog_URL && item.ecatalog_URL.trim() !== ''
//   );

//   return (
//     <>
//       <div className='space-y-1'>
//         <div className='mt-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-32 sm:px-6 '>
//           {eCatalogProducts.length === 0 && <NoResults />}
//           <h3 className='font-bold text-1xl'>Produk eKatalog</h3>
//           <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12'>
//             {eCatalogProducts.map((item) => (
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

// export default EcatalogProductPage;
