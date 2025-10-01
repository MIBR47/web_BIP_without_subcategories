'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Categories } from '@/types';
import { motion } from 'framer-motion';
import { BASE_IMAGE_URL } from '@/lib/global_constant';

interface CategoryCardProps {
  data: Categories;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ data }) => {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const handleClick = () => {
    router.push(`/categories/${data?.slug}`);
  };

  return (
    <motion.div
      onClick={handleClick}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="group relative cursor-pointer rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative w-full h-60">
        {data.imageURL ? (
          <Image
            src={BASE_IMAGE_URL + data.imageURL}
            alt={data.name}
            fill
            className="object-contain"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
            No Image
          </div>
        )}

        {/* Overlay with title */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 z-20">
          <h3 className="text-lg font-semibold text-white drop-shadow-md group-hover:text-blue-300 transition-colors duration-300">
            {data.name.trim()}
          </h3>
        </div>
      </div>

      {/* Optional footer */}
      <div className="px-4 py-3 flex justify-between items-center bg-white">
        <span className="text-xs text-gray-500">Explore</span>
        <span className="text-blue-600 font-medium text-sm group-hover:underline">
          →
        </span>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
