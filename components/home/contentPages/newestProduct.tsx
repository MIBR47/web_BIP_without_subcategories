// 'use client';
import Image from 'next/image';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useMediaQuery } from 'react-responsive';
import { Button } from '@/components/ui/button';

const NewestProduct = () => {
  // const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  // const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
  // const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const slug = 'emergency-trolley';
  return (
    // <div className="flex items-center justify-center flex-col ">
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center pb-10'>
      <div className='w-full px-4 sm:px-6 md:px-9'>
        <Image
          height={300}
          width={300}
          src='https://res.cloudinary.com/biwebapp-live/image/upload/v1722396427/ff2gsffvaorkn5bkxoug.png'
          priority
          alt='Image'
          sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
          style={{ width: '100%', height: 'auto' }}
          className='w-full h-auto rounded-md'
        />
      </div>

      <div className={'flex items-center justify-center flex-col'}>
        <h1 className='text-2xl md:text-3xl font-bold text-red-500 text-center'>
          Tetap Siaga dengan Alat yang Tepat
        </h1>
        <h2 className='md:text-2xl bg-gradient-to-r text-red-500 font-semibold text-customBlue px-4 p-2 rounded-md pb-41 w-fit text-center'>
          Akses cepat emergency pada satu tempat
        </h2>
        <div className='text-2xl lg:text-3xl sm:text-md text-customBlue px-4 p-2 pb-1 w-fit text-center'>
          Emergency Trolley
          <p>BETR-301-DLX</p>
        </div>

        <div
          className={
            'text-sm md:text-lg text-gray-600 mt-1 max-w-xs md:max-w-2xl text-center mx-auto'
          }
        >
          Dirancang khusus untuk memberikan efisiensi maksimal
          <p>dalam penanganan pasien pada kondisi darurat.</p>
        </div>
        <Button
          className='mt-6 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-customBlue hover:bg-customGreen hover:text-customBlue text-white font-semibold text-sm sm:text-base md:text-md'
          size='sm'
          asChild
        >
          <Link
            className={'text-white bg-customBlue font-semibold'}
            href={`/products/${slug}`}
          >
            Lihat produk ini lebih lanjut
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NewestProduct;
