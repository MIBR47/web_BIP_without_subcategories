import Container from '@/components/ui/container';
import Image from 'next/image';

const AboutCompany = () => {
  return (
    // <Container>
    <div className='col-span-10 sm:col-span-8'>
      <div className='space-y-2 pb-4 px-4'>
        <div className='top-1 mt-2  font-semibold text-xl text-center items-center justify-center text-customBlue mb-2'>
          <h1>Tentang Perusahaan</h1>
          <hr className="h-px mx-auto bg-gray-400 border-0 invisible dark:bg-gray-700 sm:visible"></hr>
        </div>
        <div className='relative w-full h-full flex items-center justify-center rounded-lg drop-shadow-md'>
          <Image
            src={'/images/about-company.webp'}
            height={192} // Or any height closer to the image's actual height
            width={288} // Or any width closer to the image's actual width
            alt='Image'
            className='object-cover rounded-lg'
            style={{ width: '95%', height: 'auto' }} // Display image at full width and adjust height automatically
            sizes='100vw' // Adjusts image size according to the viewport width
            loading='eager'
          />
        </div>

        <div className='w-full flex items-center justify-center'>
          <div className='mt-3 px-4 md:px-10 lg:px-8 xl:px-8 2xl:px-8 text-base text-justify md:text-md text-gray-500'>
            PT BUMI INDAH PUTRA adalah produsen tempat tidur pasien dan
            peralatan furniture rumah sakit lainnya dengan merek dagang BIPMED
            yang telah berdiri resmi sejak tahun 2000 dan memiliki pabrik dengan
            standar nasional di Cipendawa, Bekasi – Jawa Barat dengan jumlah
            tenaga kerja mencapai 100 orang.
            <div className='mt-4'>
              PT BUMI INDAH PUTRA memiliki standar mutu yang tinggi untuk setiap
              produk yang dihasilkan, didukung dengan mesin-mesin yang
              berteknologi tinggi dan juga tenaga kerja yang memiliki
              sertifikasi pada bidangnya masing-masing sehingga menjamin produk
              yang dihasilkan sudah sesuai dengan standar yang telah ditentukan.
            </div>
            <div className='mt-4'>
              PT BUMI INDAH PUTRA telah memperoleh sertifikasi ISO 9001:2015 dan
              CPAKB untuk memastikan kualitas produk kami sesuai dengan standar
              mutu dunia.
            </div>
            <div className='mt-4'>
              Produk yang kami hasilkan juga telah memperoleh nomor izin edar
              dari Kementrian Kesehatan Indonesia dan juga telah lolos uji
              Standar Keamanan Elektrik IEC 60601 dari lembaga yang berwenang.
            </div>
            <div className='mt-4'>
              Dengan moto kami, “Your Perfect Solution for Hospital Equipment
              Solutions” atau “Solusi Sempurna Anda untuk Peralatan Rumah Sakit”
              dan dedikasi yang tinggi, kami akan selalu berusaha untuk
              menghasilkan produk dan layanan yang terbaik untuk pelanggan kami.
            </div>
            <div className='mt-4'>
              Purna jual sempurna adalah target utama kami, karena bagi kami
              pelanggan adalah raja.
            </div>
            <div className='mt-4'>
              Dengan demikian, kami percaya bahwa produk BIPMED akan dapat
              menjadi solusi yang terbaik untuk Indonesia.
            </div>
          </div>
        </div>
      </div>
    </div>
    // </Container>
  );
};

export default AboutCompany;
