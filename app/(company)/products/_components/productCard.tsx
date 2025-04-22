'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import MainButton from '@/components/ui/MainButton';
import { Products, SubCategories } from '@/types';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { useMediaQuery } from 'react-responsive';

interface ProductCardProps {
  data: Products;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    try {
      router.push(`/products/${data?.slug.trim()}`);
    } catch (error) {
      console.error('Navigation error:', error);
      setLoading(false); // Reset loading state if navigation fails
    }
  };

  // if (loading) {
  //   return <Loading />;
  // }
  // console.log(data.ProductImage)
  const primaryImage = data.ProductImage.find(((image) => image.isPrimary === true));
  // console.log(primaryImage)

  const lowerCaseName = data.name.toLowerCase();
  const productName = lowerCaseName
    .split('/')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('/')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const cardVariant = {
    initial: { opacity: 0, x: 120, scale: 0.5 },
    animate: { opacity: 1, x: 0, scale: 1 },
  };

  const motionDiv = (
    <motion.div
      className={cn(
        'absolute p-4 left-0 right-0 top-0 bottom-0 bg-[#AEC6CF]/80'
      )}
      variants={cardVariant}
    >
      <div className='pt-[50%]'>
        <div className='flex justify-center'>
          <MainButton
            text='Lihat Produk'
            classes='bg-customGreen text-white font-bold hover:bg-customBlue'
            action={() => handleClick()}
          />
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial='initial'
      animate='initial'
      whileHover='animate'
      viewport={{ once: false }}
      transition={{ duration: 0.4 }}
      className='relative rounded-lg overflow-hidden flex flex-col'
    >
      <div className='relative items-center justify-center'>
        <Card
          className='cursor-pointer flex flex-col h-full'
          onClick={handleClick}
        >
          <CardHeader className='text-center items-center justify-center text-customBlue bg-gray-200 text-sm h-2'>
            {data.catalog_id}
          </CardHeader>

          <CardContent className='flex items-center justify-center h-[18rem] relative'>
            {primaryImage ? (
              <Image
                src={primaryImage.imageURL}
                priority
                // height={100}
                // width={100}
                alt='Image'
                className='object-contain rounded-md cursor-pointer object-scale-down'
                // sizes='(max-width: 140px) 100vw, (max-width: 168px) 50vw, 33vw'
                // style={{ width: '100%', height: '100%' }}
                onClick={isMobile ? handleClick : undefined}
                layout="fill"
                objectFit="contain"
              />
            ) : (
              <div className='aspect-square object-cover rounded-md bg-gray-200 w-full h-full' />
            )}
          </CardContent>

          <div className=' bg-gray-200 text-customBlue justify-center text-center md:text-md sm:text-md sm:h-18 '>
            <CardFooter className='my-3 items-center text-center justify-center'>
              <p>{productName}</p>
            </CardFooter>
          </div>
        </Card>
      </div>
      {!isMobile && motionDiv}
    </motion.div>
  );
};

export default ProductCard;
