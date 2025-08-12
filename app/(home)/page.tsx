import CustomProductSection from '../../components/home/contentPages/productsSection';
import TkdnProductContent from '../../components/home/contentPages/tkdnProduct';
import AboutUsSection from '../../components/home/contentPages/aboutUsSection';
import ProductSection from '../../components/home/contentPages/productSection';
import { getBillboard } from '@/lib/api/billboardApi';
import BillboardClientWrapper from './_components/BillboardClientWrapper';
import LatestNewsSection from '@/components/home/contentPages/lastestNewsSection';

const HomePage = async () => {

  return (
    <>
      <div className=' pb-3'>
        {/* <BillboardPage data={billboardData} /> */}
        <BillboardClientWrapper />


        <div className='bg-gradient-to-b from-gray-100 via-white to-blue-100'>

          <AboutUsSection />

          <ProductSection />
        </div>

        <CustomProductSection />
        <LatestNewsSection />
        {/* send  mail content */}
        {/* <div>
          <div className="p-8 px-40 flex-1">
            <h2 className="text-2xl font-bold text-customBlue mb-4">Get in Touch</h2>
            <hr className="mb-4" />
            <p className="mb-4 text-gray-700">
              Mohon untuk mengisi informasi Anda dengan tepat dan sesuai dengan yang sebenarnya, agar balasan email Anda bisa sesuai dengan yang Anda harapkan.
            </p>
            <p className="mb-4 text-gray-700">
              Waktu respons bervariasi sesuai dengan banyaknya data yang diminta, akan kami usahakan dalam 1x24 jam sudah mendapatkan balasan.
            </p>
            <p className="mb-6 text-gray-700">
              Kami memastikan bahwa data diri Anda akan aman dan hanya digunakan untuk kepentingan PT BUMI INDAH PUTRA.
            </p>
            <form className="space-y-4">
              <input type="text" placeholder="Name*" className="w-full p-3 border border-gray-300 bg-gray-100 rounded" />
              <input type="email" placeholder="Email*" className="w-full p-3 border border-gray-300 bg-gray-100 rounded" />
              <input type="tel" placeholder="Telephone*" className="w-full p-3 border border-gray-300 bg-gray-100 rounded" />
              <textarea placeholder="Message*" rows={5} className="w-full p-3 border border-gray-300 bg-gray-100 rounded"></textarea>
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">Kirim Pesan</button>
            </form>
          </div>
        </div> */}

      </div>
    </>
  );
};

export default HomePage;
