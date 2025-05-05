'use client';
import React, { useEffect, useState, MouseEventHandler } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Categories } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import usePreviewModal from '@/hooks/use-preview-modal';
import MainButton from '@/components/ui/MainButton';

interface CategoryCardProps {
  data: Categories;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ data }) => {
  const router = useRouter();
  const previewModal = usePreviewModal();
  const primaryImage = data.imageURL;

  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const mediaQuery = window.matchMedia('(max-width: 640px)');
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (!hasMounted) return null; // Prevent hydration error

  const handleClick = () => {
    setLoading(true);
    try {
      router.push(`/categories/${data?.slug}`);
    } catch (error) {
      console.error('Navigation error:', error);
      setLoading(false);
    }
  };

  const cardVariant = {
    initial: { opacity: 0, x: 120, scale: 0.5 },
    animate: { opacity: 1, x: 0, scale: 1 },
  };

  return (
    <motion.div
      initial="initial"
      animate="initial"
      whileHover="animate"
      transition={{ duration: 0.4 }}
      className="relative rounded-lg overflow-hidden w-full max-w-xs shadow-md"
    >
      <div className="relative">
        <Card className="cursor-pointer" onClick={handleClick}>
          <CardContent className="h-64">
            {primaryImage ? (
              <Image
                src={primaryImage}
                priority
                height={250}
                width={250}
                alt="Category Image"
                className="object-contain w-full h-full rounded-md"
              />
            ) : (
              <div className="bg-gray-200 w-full h-full flex items-center justify-center rounded-md">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="cursor-pointer text-customBlue text-left text-md bg-gray-200 p-4">
            {data.name.trim()}
          </CardFooter>
        </Card>
      </div>

      {(
        <motion.div
          className={cn('absolute p-4 left-0 right-0 top-0 bottom-0 bg-[#AEC6CF]/80')}
          variants={cardVariant}
        >
          <div className="pt-[50%] flex justify-center">
            <MainButton
              text="Lihat Produk"
              classes="bg-customGreen text-white font-bold hover:bg-customBlue"
              action={handleClick}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CategoryCard;
