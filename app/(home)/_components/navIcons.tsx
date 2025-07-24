'use client';

import Image from 'next/image';
import Link from 'next/link';
import flag1 from '@/public/images/id-flag.png';
import { Button } from '../../../components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const NavIcons = () => {
  return (
    <div className='flex items-center gap-0.5 xl:gap-0.5 relative'>
      <Button
        type='button'
        className='bg-transparent hover:bg-transparent'
        aria-label='Country flag'
      >
        <span className='w-6 h-6 rounded-full me-1.5'>
          <Image
            src={flag1}
            alt=''
            className='w-full h-full object-cover rounded-full'
          />
        </span>
      </Button>

      <div className='flex space-x-0.5'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href='https://wa.me/6281255558023'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Contact us on WhatsApp'
              >
                <Image
                  src='/images/logo/wa.svg'
                  height={24}
                  width={24}
                  alt='WhatsApp logo'
                  className='w-14 h-14 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain rounded-full'
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent color='customGreen'>
              <p>Hubungi hotline kami</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default NavIcons;
