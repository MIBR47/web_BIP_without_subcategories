import PageHeader from '@/components/ui/page-header';
import { routes } from '@/config/routes';
import NoResults from '@/components/ui/no-results';
import getCategories from '@/actions/get-categories';
import dynamic from 'next/dynamic';
// import CategoryCard from '../_components/categoryCard';
import './style.css';

const CategoryCard = dynamic(() => import('../_components/categoryCard'), {
  ssr: false,
});

const pageHeader = {
  title: 'Daftar Kategori',
  breadcrumb: [
    {
      name: 'Beranda',
      href: routes.home,
    },
    {
      name: 'Daftar Kategori',
    },
  ],
};

const CategoryList = async () => {
  const categories = await getCategories();

  const categoriesFound = categories?.length;

  const subHeaderText = categoriesFound ? (
    <>
      <span className='desktop-text'>
        Terdapat {categoriesFound} kategori untuk ditampilkan
      </span>
      <span className='mobile-text'>
        {categoriesFound} kategori ditampilkan
      </span>
    </>
  ) : (
    <>Tidak ada kategori untuk ditampilkan</>
  );

  return (
    <>
      <div className='space-y-1'>
        <div className='mt-5 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-32 sm:px-6'>
          <PageHeader
            title={pageHeader.title}
            breadcrumb={pageHeader.breadcrumb}
          />

          <h3 className='text-customBlue text-sm'>
            {subHeaderText}
            {categoriesFound === 0 && <NoResults />}
          </h3>

          <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12'>
            {categories.length > 0 ? (
              categories.map((categoryList) => (
                <div key={categoryList.id}>
                  <CategoryCard data={categoryList} />
                </div>
              ))
            ) : (
              <NoResults />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
