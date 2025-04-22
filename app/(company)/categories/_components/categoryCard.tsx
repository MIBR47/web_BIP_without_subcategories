'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import { Categories } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useMediaQuery } from 'react-responsive';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MouseEventHandler } from 'react';
import usePreviewModal from '@/hooks/use-preview-modal';
import MainButton from '@/components/ui/MainButton';
import IconButton from '@/components/ui/icon-button';
import { ScanSearch } from 'lucide-react';

interface CategoryCardProps {
  data: Categories;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ data }) => {
  const router = useRouter();
  const previewModal = usePreviewModal();
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const primaryImage = data.imageURL;
  console.log(primaryImage)
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    try {
      console.log('Navigating to:', `/categories/${data?.slug}`);
      router.push(`/categories/${data?.slug}`);
    } catch (error) {
      console.error('Navigation error:', error);
      setLoading(false); // Reset loading state if navigation fails
    }
  };
  // if (loading) {
  //   return (
  //     <div>
  //       <Loading />
  //     </div>
  //   );
  // }

  const handlePreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
    // window.history.pushState(null, '', `/categories/${data.slug.trim()}`);
  };

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
            action={handleClick}
          // action={() => router.push(`/categories/${data?.slug.trim()}`)}
          />
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <motion.div
        initial='initial'
        animate='initial'
        whileHover='animate'
        viewport={{ once: false }}
        transition={{ duration: 0.4 }}
        className='relative rounded-lg overflow-hidden'
      >
        <div className='relative'>
          <Card className={'cursor-pointer'} onClick={handleClick}>
            <CardContent>
              {primaryImage != null ? (
                <Image
                  src={primaryImage}
                  priority
                  height={100}
                  width={100}
                  alt='Image'
                  className='object-contain w-full rounded-md cursor-pointer'
                  sizes='(max-width: 140px) 100vw, (max-width: 168px) 50vw, 33vw'
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                // <div className='aspect-square object-cover rounded-md bg-gray-200 w-full h-full' />
                <Image
                  src="https://res.cloudinary.com/biwebapp-live/image/upload/v1723188910/kh5ub7qszg86fqrdkuht.png"
                  priority
                  height={100}
                  width={100}
                  alt='Image'
                  className='object-contain w-full rounded-md cursor-pointer'
                  sizes='(max-width: 140px) 100vw, (max-width: 168px) 50vw, 33vw'
                  style={{ width: '100%', height: '100%' }}
                />
              )}
            </CardContent>
          </Card>
        </div>
        {!isMobile && motionDiv}
      </motion.div>

      <div className='relative'>
        <CardFooter className='cursor-pointer flex items-left text-customBlue text-left text-md bg-gray-200 pt-6 h-4 mt-0'>
          {data.name.trim()}
        </CardFooter>
        {/* {!isMobile && (
          <IconButton
            onClick={handlePreview}
            className='absolute top-2 right-2 bg-gray-100 hover:bg-white hover:text-customBlue w-8 h-8 flex items-center justify-center'
            icon={<ScanSearch size={15} className='text-gray-400' />}
          />
        )} */}
      </div>
    </>
  );
};

export default CategoryCard;
