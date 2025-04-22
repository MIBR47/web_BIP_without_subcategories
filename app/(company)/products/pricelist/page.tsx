'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePriceList } from '@/hooks/usePricelist';
import Container from '@/components/ui/container';
import FileDownloader from '@/components/filedownloader';

// import { PriceList } from '@/types';

const PriceListPage = () => {
  const { data: datatodownload, isLoading } = usePriceList();

  const filetoDownload = datatodownload?.map((item) => {
    return item.fileURL;
  });

  return (
    <Container>
      <div className='space-y-3 pb-2'>
        <div className='w-full h-full flex items-center justify-center '>
          <Image
            src={'/images/logo/ekatalog.jpg'}
            height={300}
            width={300}
            alt='Image'
            className='object-cover'
            style={{ width: '85%', height: '85%' }}
            sizes='(max-width: 140px) 100vw, (max-width: 168px) 50vw, 33vw'
          />
        </div>

        <div className={'w-full flex items-center justify-center'}>
          {/* <div className='grid grid-cols-1 md:grid-cols-1 gap-4 items-center text-lg justify-center pb-10'> */}

          <div className='mt-3 px-12 md:px-12 lg:px-16 xl:px-20 2xl:px-24 md:text-md'>
            E-CATALOGUE LKPP merupakan platform resmi yang disediakan oleh
            pemerintah untuk pengadaan alat kesehatan di seluruh rumah sakit dan
            puskesmas di Indonesia.
            {/* </div>
          <div className='mt-5 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 md:text-lg'> */}
            <div className='mt-5'>
              Melalui sistem e-purchasing ini, diharapkan dapat menekan angka
              korupsi berkat transparansi sistem dan harga yang telah tercantum
              secara nasional.
            </div>
            <div className='mt-4'>
              Produk-produk BIPMED telah tercantum dalam E-CATALOGUE LKPP RI,
              memudahkan rumah sakit untuk melakukan pembelian melalui sistem
              e-purchasing.
            </div>
            <div className='mt-4'>
              Silakan Kunjungi kami di E-CATALOGUE LKPP RI untuk melihat
              produk-produk kami yang telah terdaftar dan price list terbaru
              dengan cara melakukan klik tautan di bawah ini :
            </div>
            {/* <div className='mt-4 '> */}
            <div className='mt-4 lg:grid lg:grid-cols-2 lg:items-center text-center justify-center lg:gap-x-8'>
              <Link
                href='https://e-katalog.lkpp.go.id/id/search-produk?authenticityToken=12de240b815803e8005ba8fec80471a2775a9790&q=bipmed&pid=277042&order=relevance&limit=12&offset=1'
                className='font-semibold text-lg text-customBlue'
                target='_blank'
                rel='noopener noreferrer'
              >
                PT. Bumi Indah Putra - E-CATALOGUE
              </Link>
              <div>
                <FileDownloader
                  fileUrl={filetoDownload ? filetoDownload[0] : ''}
                  filename={'bipmedpricelist.pdf'}
                  title='Download Price List e-Catalogue'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PriceListPage;
