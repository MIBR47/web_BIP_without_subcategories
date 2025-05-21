import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import Container from '@/components/ui/container';

const VisiMisi = () => {
  return (
    // <Container>
    <div className='col-span-10 sm:col-span-8'>
      <div className='space-y-2 pb-2 px-4'>
        <div className='top-1 mt-2 font-semibold text-xl text-center items-center justify-center text-customBlue mb-2'>
          <h1>Visi dan Misi</h1>
          <hr className="h-px mx-auto bg-gray-400 border-0 invisible dark:bg-gray-700 sm:visible"></hr>
        </div>
        <div className='relative w-full h-full flex items-center justify-center rounded-lg drop-shadow-md mb-32'>
          <Image
            src={'/images/visi-misi.webp'}
            height={192} // Or any height closer to the image's actual height
            width={288} // Or any width closer tor any width closer to the image's actual width
            alt='Image'
            className='object-contain rounded-lg'
            style={{ width: '95%', height: 'auto' }} // Display image at full width and adjust height automatically
            sizes='100vw' // Adjusts image size according to the viewport width
            loading='eager'
          />
        </div>

        <div className='mt-3 px-4 md:px-8 lg:px-24 xl:px-42 2xl:px-42 md:text-md font-semibold text-xl text-left text-customBlue'>
          <h1>Visi</h1>
          <Separator />
        </div>

        <div className='w-full ml-2'>
          <ul className='list-disc pl-4 md:pl-8 lg:pl-24 xl:pl-20 2xl:pl-36 md:text-md text-gray-500'>
            <li className='ml-0'>
              <p>
                Menjadikan BIPMED sebagai produk alat kesehatan dengan kualitas
                dan harga terbaik di Indonesia.
              </p>
            </li>
          </ul>
        </div>

        <div className='mt-3 px-4 md:px-8 lg:px-24 xl:px-42 2xl:px-42 md:text-md font-semibold text-xl text-left text-customBlue'>
          <h1>Misi</h1>
          <Separator />
        </div>

        <div className='w-full ml-2'>
          <ul className='list-disc pl-4 md:pl-8 lg:pl-24 xl:pl-20 2xl:pl-36 md:text-md text-gray-500'>
            <li className='ml-0'>
              <p>
                Menghasilkan produk dengan kualitas terbaik dan berstandar mutu
                internasional.
              </p>
            </li>
            <li className='ml-0'>
              <p>
                Memastikan layanan purna jual sempurna kepada seluruh pelanggan
                BIPMED.
              </p>
            </li>
            <li className='ml-0'>
              <p>
                Inovasi tanpa batas demi menciptakan produk sesuai dengan
                perkembangan zaman.
              </p>
            </li>
            <li className='ml-0'>
              <p>
                Memberikan kesempatan kepada karyawan untuk berkarya,
                berkembang, dan memiliki masa depan yang sejahtera.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    // {/* </Container> */}
  );
};

export default VisiMisi;
