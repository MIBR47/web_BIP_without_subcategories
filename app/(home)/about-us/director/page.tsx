'use client';

import Image from 'next/image';
import Container from '@/components/ui/container';
import { usePathname } from 'next/navigation';
import { routes } from '@/config/routes';

const Director = () => {
  const pathname = usePathname();

  return (
    <div className='col-span-10 sm:col-span-8'>
      <div className='space-y-2 pb-4 px-4'>
        <div className='top-1 mt-2  font-semibold text-xl text-center items-center justify-center text-customBlue mb-2'>
          <h1>Pesan Direktur</h1>
          <hr className="h-px mx-auto bg-gray-400 border-0 invisible dark:bg-gray-700 sm:visible"></hr>
        </div>
        <div className='relative w-full h-full flex items-center justify-center rounded-lg drop-shadow-md'>
          <Image
            src={'/images/pesdir.webp'}
            height={192} // Or any height closer to the image's actual height
            width={288} // Or any width closer to the image's actual width
            alt='Image'
            className='object-contain rounded-lg'
            style={{ width: '95%', height: 'auto' }} // Display image at full width and adjust height automatically
            sizes='100vw' // Adjusts image size according to the viewport width
            loading='eager'
          />
        </div>

        <div className='w-full flex items-center justify-center text-customBlue'>
          <div className='mt-3 px-4 md:px-10 lg:px-8 xl:px-8 2xl:px-8 text-base md:text-md text-gray-500 text-justify'>
            PT BUMI INDAH PUTRA pertama didirikan pada tahun 1998 berfokus pada
            produksi tempat tidur pasien dan peralatan furniture rumah sakit
            lainnya seperti meja periksa, meja operasi, incubator bayi,
            lemari-lemari, troli instrument, dan lainnya.
            <div className='mt-4'>
              Lalu pada tahun 2000 PT BUMI INDAH PUTRA resmi memiliki pabrik
              dengan standar nasional dengan jumlah karyawan kurang lebih 100
              orang.
              <div className='mt-4'>
                Latar belakang saya mendirikan perusahaan ini adalah karena
                melihat jumlah produsen lokal untuk kategori ini sangat sedikit
                dan saya memiliki impian agar Indonesia 100% menggunakan produk
                dalam negeri untuk kategori Furnitur Rumah Sakit.
              </div>
              <div className='mt-4'>
                Maka dari itu, PT BUMI INDAH PUTRA dengan hak paten merek BIPMED
                berkomitmen selalu untuk menghasilkan produk-produk dengan
                kualitas internasional dan harga yang terjangkau bagi seluruh
                Rumah Sakit dan Fasilitas Kesehatan di seluruh Indonesia.
              </div>
              <div className='mt-4'>
                BIPMED, your perfect choice for hospital equipments.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  );
};

export default Director;
