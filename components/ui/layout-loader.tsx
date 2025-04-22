'use client';
import React from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
// import { SiteLogo } from "@/components/svg";
const LayoutLoader = () => {
  return (
    <div className=' h-screen flex items-center justify-center flex-col space-y-2 top-1'>
      {/* <SiteLogo className=" h-6 w-6 text-primary" /> */}
      <Image
        src='/images/logo/logo.webp'
        alt='layoutLoaderLogo'
        width={100}
        height={100}
        loading='eager'
        decoding='async'
        priority
      />
      <span className=' inline-flex gap-1 text-customBlue'>
        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        Mohon tunggu sebentar ...
      </span>
    </div>
  );
};

export default LayoutLoader;
