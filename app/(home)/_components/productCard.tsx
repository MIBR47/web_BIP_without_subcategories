'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ProductResponse } from '@/types';
import { BASE_IMAGE_URL } from '@/lib/global_constant';

interface ProductCardProps {
  data: ProductResponse;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${data?.slug.trim()}`);
  };

  const primaryImage = data.ProductImage.find((img) => img.isPrimary);

  const productName = data.name
    .toLowerCase()
    .split('/')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('/')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="group cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 border border-gray-100">
        {/* Product Image */}
        <div className="relative h-48 w-full bg-gray-50 flex items-center justify-center">
          {primaryImage ? (
            <Image
              src={BASE_IMAGE_URL + primaryImage.imageURL}
              alt={productName}
              fill
              className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
              No Image
            </div>
          )}

          {/* Catalog ID Badge */}
          <span className="absolute top-3 left-3 bg-blue-600/90 text-white text-[11px] font-medium px-2 py-0.5 rounded-md shadow-sm">
            {data.catalog_id}
          </span>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-sm md:text-base font-semibold text-gray-800 text-center line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {productName}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
