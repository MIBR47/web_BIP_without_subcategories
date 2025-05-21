
// import getBillboard from '@/actions/get-billboard';
import BillboardPage from './contentPages/billboardSection';
import CustomProductContent from './contentPages/customProducts';
import TkdnProductContent from './contentPages/tkdnProduct';
import AboutUsSection from './contentPages/aboutUsSection';
import ProductSection from './contentPages/productSection';
// import { useBillboards } from '@/hooks/use-billboard';
import { getBillboard } from '@/lib/api/billboardApi';
import BillboardClientWrapper from './_components/BillboardClientWrapper';

const CompanyPage = async () => {
  const billboardData = await getBillboard("Show");

  // const {
  //   data: Billboards,
  //   isLoading,
  //   error,
  // } = useBillboards()

  // console.log("check data billboard: " + Billboards?.title)
  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error loading billboard</p>;
  // if (!Billboards) return <p>No billboard data</p>;
  return (
    <>
      <div className=' pb-3'>
        {/* <BillboardPage data={billboardData} /> */}
        <BillboardClientWrapper />

        {/* </div> */}

        {/* <NewestProduct />
        {/* Hero Section */}
        {/* <section className="bg-gradient-to-r from-blue-50 to-white py-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Solusi Alat Kesehatan Terpercaya
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6">
              Menyediakan perlengkapan rumah sakit berkualitas, sesuai kebutuhan Anda.
            </p>
            <Button asChild className="bg-customBlue hover:bg-customGreen text-white px-6 py-3 text-lg">
              <Link
                href="https://wa.me/6281255558023"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="mr-2" />
                Konsultasi Sekarang
              </Link>
            </Button>
          </div>
        </section> */}
        <div className='bg-gradient-to-b from-gray-100 via-white to-blue-100'>

          <AboutUsSection />

          <ProductSection />
        </div>

        {/* <div> */}
        <CustomProductContent />
        {/* </div> */}



        {/* <div> */}
        <TkdnProductContent />
      </div>
    </>
  );
};

export default CompanyPage;
