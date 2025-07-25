import NextImage from 'next/image';
import { Tab } from '@headlessui/react';

import { cn } from '@/lib/utils';
import { ProductImage } from '@/types';
import { BASE_IMAGE_URL } from '@/lib/global_constant.';

interface GalleryTabProps {
  image: ProductImage;
}

const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
  return (
    <Tab className='relative flex aspect-square cursor-pointer items-center justify-center rounded-md'>
      {({ selected }) => (
        <div>
          <span className='absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md'>
            <NextImage
              fill
              src={BASE_IMAGE_URL + image.imageURL}
              alt=''
              className='object-contain object-center'
            />
          </span>
          <span
            className={cn(
              'absolute inset-0 rounded-md ring-2 ring-offset-2',
              selected ? 'ring-black' : 'ring-transparent'
            )}
          />
        </div>
      )}
    </Tab>
  );
};

export default GalleryTab;
