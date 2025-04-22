import getBillboard from '@/actions/get-billboard';
import BillboardPage from './billboard/billboard';
import CustomProductContent from './contentPages/customProducts';
import TkdnProductContent from './contentPages/tkdnProduct';
import NewestProduct from './contentPages/newestProduct';

const CompanyPage = async () => {
  const billboardData = await getBillboard("SHOW");
  console.log("check data billboard: " + billboardData.title)

  return (
    <>
      <div className='space-y-1 pb-3'>
        <BillboardPage data={billboardData} />

        {/* </div> */}

        <NewestProduct />

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
