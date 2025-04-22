import Link from 'next/link';
import { routes } from '@/config/routes';
const NoResults = () => {
  return (
    <div className='pt-2 mt-24 py-20 flex items-center justify-center h-full w-screen'>
      <Link
        href={routes.cms.categoryList}
        className='text-center font-semibold text-customBlue'
      >
        Klik di sini untuk kembali
      </Link>
    </div>
  );
};

export default NoResults;
