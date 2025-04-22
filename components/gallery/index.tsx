'use client';

import NextImage from 'next/image';
import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import { ProductImage } from '@/types';

import GalleryTab from './gallery-tab';

interface GalleryProps {
  images: ProductImage[];
}

const Gallery: React.FC<GalleryProps> = ({ images = [] }) => {
  const sortedImages = images.sort((a, b) =>
    a.isPrimary === b.isPrimary ? 0 : a.isPrimary ? -1 : 1
  );

  const primaryImage = sortedImages[0];

  return (
    <TabGroup as='div' className='flex flex-col-reverse'>
      <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none'>
        <TabList className='grid grid-cols-4 gap-6'>
          {sortedImages.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </TabList>
      </div>
      <TabPanels className='aspect-square w-full'>
        {sortedImages.map((image) => (
          <TabPanel key={image.id}>
            <div className='aspect-square relative h-full w-full rounded-lg overflow-hidden'>
              <NextImage
                priority
                fill
                src={image.imageURL}
                alt='Image'
                className='object-contain rounded-lg'
              />
            </div>
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default Gallery;
