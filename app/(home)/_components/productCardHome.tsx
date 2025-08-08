'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

import { ProductResponse } from '@/types';
import { cn } from '@/lib/utils';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { BASE_IMAGE_URL } from '@/lib/global_constant';

interface ProductCardProps {
  data: ProductResponse;
}

const HomeProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  const handleClick = () => {
    router.push(`/products/${data?.slug.trim()}`);
  };

  const primaryImage = data.ProductImage.find((img) => img.isPrimary);

  const productName = data.name
    .toLowerCase()
    .split('/')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('/')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className='transition-transform duration-300 ease-in-out'
    >
      <Card
        className='w-full sm:w-60 md:w-64 lg:w-72 relative flex flex-col rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white cursor-pointer'
        onClick={handleClick}
      >
        {/* Catalog ID */}
        <CardHeader className='bg-gray-100 text-xs text-customBlue font-medium text-center py-2'>
          {data.catalog_id}
        </CardHeader>

        {/* Product Image */}
        <CardContent className='relative h-40 flex items-center justify-center p-4 bg-white'>
          {primaryImage ? (
            <Image
              src={BASE_IMAGE_URL + primaryImage.imageURL}
              alt={productName}
              layout='fill'
              objectFit='contain'
              className='rounded-md'
              priority
            />
          ) : (
            <div className='w-full h-full bg-gray-200 rounded-md' />
          )}
        </CardContent>

        {/* Product Name */}
        <CardFooter className='flex items-center justify-center bg-gray-50 px-4 py-3'>
          <p className='text-sm font-semibold text-customBlue text-center leading-tight'>
            {productName}
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default HomeProductCard;
