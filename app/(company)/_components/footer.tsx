'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';

const phoneNumbers = ['021-82731750', '021-82731806', '021-82731834'];
const emaillist = ['marketing@bipmed.co.id', 'customerservice@bipmed.co.id'];

const Footer = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  return (
    <div className='py-5 px-4 md:px-8 lg:px-4 xl:px-26 2xl:px-4 bg-customBlue text-sm text-slate-100 mt-20'>
      <div
        className={`w-full ${isMobile ? 'flex flex-col items-center' : 'grid grid-cols-1 md:grid-cols-3 gap-8'}`}
      >
        {/* LEFT */}
        <div
          className={`flex flex-col gap-2 ${isMobile ? 'items-center text-center' : 'items-start'}`}
        >
          <Link href='/'>
            <div className='flex items-center justify-center'>
              <Image
                src='/images/logo/logo.webp'
                alt='footerlogo'
                width={isMobile ? 300 : 200}
                height={isMobile ? 80 : 70}
                className='object-cover object-center'
                style={{ width: 'auto', height: 'auto' }} // Maintain aspect ratio
                loading='eager'
                decoding='async'
                priority
              />
            </div>
          </Link>
          <div className='mb-3'>
            <div>Alex Bangun Cipendawa Baru</div>
            <div>RT.003 RW.002, Bantar Gebang </div>
            <div> Kota Bekasi, Jawa Barat, 17151</div>
          </div>
        </div>
        {/* CENTER */}
        <div
          className={`flex flex-col gap-2 mb-3 ${isMobile ? 'items-center text-center' : 'items-center'}`} // Added padding
        >
          <div
            className={`flex flex-col ${isMobile ? 'items-center' : 'items-start'}`} // Added padding-left
          >
            <h1 className='font-medium text-md items-start mb-4'>
              Kontak Kami di
            </h1>
            {phoneNumbers.map((number, index) => (
              <div key={index} className='flex items-start justify-center mb-1'>
                <Phone className='mr-2' size={16} />
                <span>{number}</span>
              </div>
            ))}
            {emaillist.map((email, index) => (
              <div key={index} className='flex items-start mb-1'>
                <Mail className='mr-2' size={16} />
                <span>{email}</span>
              </div>
            ))}
          </div>
        </div>
        {/* RIGHT */}
        <div className='flex justify-end pr-4'>
          <div
            className={`flex flex-col gap-2 ${isMobile ? 'items-center text-center' : 'items-start text-left'}`}
          >
            <h1 className='font-medium text-md justify-start text-left items-start mb-4'>
              Kunjungi kami di
            </h1>
            <div
              className={`flex flex-col text-left ${isMobile ? 'items-center' : 'items-start'}`}
            >
              <div className='mb-3 flex justify-start text-left items-start'>
                <Link
                  href='https://www.instagram.com/bipmed_ptbumiindahputra?igsh=OHVoODR0OTMwdGZw'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center'
                >
                  <FaInstagram className='mr-2' size={20} />
                  <span>bipmed@instagram</span>
                </Link>
              </div>

              <div className='mb-3 flex justify-start text-left items-start'>
                <Link
                  href='https://www.youtube.com/watch?v=z6IbKBkJwRw'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center'
                >
                  <FaYoutube className='mr-2' size={20} />
                  <span>bipmed@youtube</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
