// 'use client';
// import { useRouter } from 'next/navigation';
// import usePreviewModal from '@/hooks/use-preview-modal';
// import Modal from '@/components/ui/modal';
// import Image from 'next/image';
// import { useProductCategory } from '@/hooks/use-product-category';
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   CardFooter,
// } from '@/components/ui/card';
// import { cn } from '@/lib/utils';
// import { motion } from 'framer-motion';
// import MainButton from '@/components/ui/MainButton';
// import Loading from '@/components/ui/loading';

// // const PreviewModal = () => {
//   const { isOpen, data, onClose } = usePreviewModal();

//   const { data: products, isLoading } = useProductCategory({
//     category_id: data?.id ?? 0,
//   });
//   const router = useRouter();

//   if (isLoading) {
//     return (
//       <div>
//         <Loading />
//       </div>
//     );
//   }

//   if (!data) {
//     return null;
//   }

//   const subHeaderText =
//     products && products.length > 0
//       ? `Terdapat ${products.length} produk pada kategori ${data.name}`
//       : null;

//   const handleClick = (slug: number | string) => {
//     router.push(`/products/${slug}`);
//     onClose();
//   };

//   const cardVariant = {
//     initial: { opacity: 0, x: 120, scale: 0.5 },
//     animate: { opacity: 1, x: 0, scale: 1 },
//   };

//   const motionDiv = (slug: string, onClose: () => void) => (
//     <motion.div
//       className={cn(
//         'absolute p-4 left-0 right-0 top-0 bottom-0 bg-[#AEC6CF]/80'
//       )}
//       variants={cardVariant}
//     >
//       <div className='pt-[50%]'>
//         <div className='flex justify-center'>
//           <MainButton
//             text='Lihat Produk'
//             classes='bg-customGreen text-white font-bold hover:bg-customBlue'
//             action={() => {
//               onClose();
//               router.push(`/products/${slug}`);
//             }}
//           />
//         </div>
//       </div>
//     </motion.div>
//   );

//   return (
//     <Modal open={isOpen} onClose={onClose}>
//       <div className='text-center justify-center items-center bg-slate-100'>
//         <h1 className='text-lg font-semibold mb-4 text-customBlue'>
//           {subHeaderText}
//         </h1>

//         {products && products.length > 0 ? (
//           <div className='flex bg-slate-100 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
//             {products.map((product) => {
//               const primaryImage = product.ProductImage.find(
//                 (image) => image.isPrimary
//               );
//               const primaryImageURL = primaryImage
//                 ? primaryImage.imageURL
//                 : null;

//               return (
//                 <div key={product.id} className='justify-center items-center'>
//                   <motion.div
//                     initial='initial'
//                     animate='initial'
//                     whileHover='animate'
//                     viewport={{ once: false }}
//                     transition={{ duration: 0.4 }}
//                     className='relative rounded-lg overflow-hidden flex flex-col'
//                   >
//                     <Card
//                       className='cursor-pointer flex flex-col h-full '
//                       onClick={() => handleClick(product.slug)}
//                     >
//                       <CardHeader className='text-center items-center justify-center text-customBlue bg-gray-200 text-sm h-2'>
//                         {product.catalog_id}
//                       </CardHeader>

//                       <CardContent className='flex-grow flex items-center justify-center'>
//                         {primaryImageURL ? (
//                           <Image
//                             src={primaryImageURL}
//                             priority={true}
//                             height={100}
//                             width={100}
//                             alt='Image'
//                             className='object-contain rounded-md cursor-pointer'
//                             sizes='(max-width: 140px) 100vw, (max-width: 168px) 50vw, 33vw'
//                             style={{ width: '90%', height: '90%' }}
//                             onClick={() => handleClick(product.id)}
//                           />
//                         ) : (
//                           <div className='aspect-square object-cover rounded-md bg-gray-200 w-full h-full' />
//                         )}
//                       </CardContent>

//                       <div className=' bg-gray-200 text-customBlue justify-center items-centerr text-center md:text-md sm:text-md sm:h-16 md:h-24'>
//                         <CardFooter className='mt-4 items-center text-center justify-center'>
//                           <p>{product.name}</p>
//                         </CardFooter>
//                       </div>
//                     </Card>
//                     {motionDiv(product.slug, onClose)}
//                   </motion.div>
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           <p className='mt-5 text-center text-gray-500 '>
//             Tidak ada produk pada kategori test 2
//             <p>
//               <b>{data.name}</b>
//             </p>
//           </p>
//         )}
//       </div>
//     </Modal>
//   );
// };

// export default PreviewModal;
