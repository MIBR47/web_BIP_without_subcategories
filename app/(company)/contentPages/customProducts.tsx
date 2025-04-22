import Link from 'next/link';

import Image from 'next/image';

import { Button } from '@/components/ui/button';

const CustomProductContent = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center pb-20'>
      <div className='w-full px-4 sm:px-6 md:px-9'>
        <Image
          height={300}
          width={300}
          src='https://res.cloudinary.com/biwebapp-live/image/upload/v1722161447/qpfxqhr8pmskmcqydaxr.png'
          priority
          alt='Image'
          sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
          style={{ width: '100%', height: 'auto' }}
          className='w-full h-auto rounded-md'
        />
      </div>

      <div className={'flex items-center justify-center flex-col'}>
        <h1 className='text-2xl md:text-3xl font-bold  text-center'>
          Solusi Produk Custom Terbaik
        </h1>
        <h2 className='md:text-2xl bg-gradient-to-r font-semibold text-customBlue px-4 p-2 rounded-md pb-41 w-fit text-center'>
          Memadukan Kualitas dan Personalisasi dalam Perlengkapan Rumah Sakit
        </h2>
        <div
          className={
            'text-sm md:text-lg  mt-4 max-w-xs md:max-w-2xl text-gray-600 text-center mx-auto'
          }
        >
          Kami memahami bahwa setiap rumah sakit memiliki kebutuhan unik
          <p>
            Oleh karena itu, kami menyediakan solusi perlengkapan rumah sakit
            yang dapat disesuaikan dengan kebutuhan anda.
          </p>
        </div>
        <Button
          className='mt-6 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-customBlue hover:bg-customGreen hover:text-customBlue text-white font-semibold text-sm sm:text-base md:text-md'
          size='sm'
          asChild
        >
          <Link
            href='https://wa.me/6281255558023'
            target='_blank'
            rel='noopener noreferrer'
          >
            Hubungi Kami Untuk Produk Custom lainnya
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CustomProductContent;
