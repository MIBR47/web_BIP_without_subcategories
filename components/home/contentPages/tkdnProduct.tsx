'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import { Button } from '@/components/ui/button';

const TkdnProductContent = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  // const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
  // const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  return (
    // <div className="flex items-center justify-center flex-col ">
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center mt-20'>
      <div className={'flex items-center justify-center flex-col'}>
        <h1 className='text-2xl md:text-3xl font-bold text-black text-center'>
          {/* <span className="bg-customBlue text-white px-2 py-1 rounded-md"> */}
          Kualitas Internasional Karya Anak Bangsa
          {/* </span> */}
        </h1>

        <h2 className='text-2xl text-customBlue md:text-2xl sm:text-1xl font-semibold px-4 p-2 pb-1 w-fit text-center'>
          Dukung Kesehatan Nasional dengan Produk TKDN
        </h2>
        <div
          className={
            'text-sm md:text-lg px-16 text-gray-600 mt-4 max-w-xs md:max-w-2xl text-center mx-auto'
          }
        >
          Produk kami telah memenuhi standar TKDN dan dipastikan telah menjamin
          keamanan serta kenyamanan yang berkualitas tinggi bagi para pasien.
          {/* <p> */}
          <div className='mt-2'>
            Kami berkomitmen mendukung kesehatan dan pembangunan ekonomi
            nasional melalui produk berkualitas hasil karya terbaik anak bangsa.
          </div>
          {/* </p> */}
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
            Hubungi Kami Untuk Produk TKDN lainnya
          </Link>
        </Button>
      </div>
      <div className='w-full px-4 sm:px-6 md:px-9'>
        <Image
          height={300}
          width={300}
          src='https://res.cloudinary.com/biwebapp-live/image/upload/v1722171846/nfy706vqpv4bk6cch0q3.png'
          priority
          alt='Image'
          sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
          style={{ width: '100%', height: 'auto' }}
          className='w-full h-auto rounded-md'
        />
      </div>
    </div>
  );
};

export default TkdnProductContent;
