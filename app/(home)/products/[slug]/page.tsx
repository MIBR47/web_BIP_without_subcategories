import { Metadata } from 'next';
import { ProductResponse } from '@/types';
import { routes } from '@/config/routes';

import { fetchCategoryById } from '@/lib/api/categoryApi';
import { getProductBySlug } from '@/lib/api/productApi';

import Container from '@/components/ui/container';
import Gallery from '@/components/gallery';
import Info from './_components/info';
import PageHeader from '@/components/ui/page-header';

export const revalidate = 0;

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// METADATA
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata | undefined> {
  const product: ProductResponse = await getProductBySlug({ slug: params.slug.trim() });

  return {
    title: product.name,
    description: product.ProductDesc?.other_info || 'Detail produk',
    openGraph: {
      title: product.name,
      description: product.ProductDesc?.other_info || 'Detail produk',
      type: 'website',
      locale: 'id_ID',
      siteName: 'bipmed',
      images: product.ProductImage.length
        ? [{ url: product.ProductImage[0].imageURL }]
        : [],
    },
  };
}

// PAGE
export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug({ slug: params.slug.trim() });

  if (!product) {
    return (
      <div className="text-center py-24 text-red-600 text-lg">
        Produk tidak ditemukan.
      </div>
    );
  }

  const category = await fetchCategoryById(product.category_id);
  const categorySlug = category?.slug || '';
  const categoryName = category?.name || 'Kategori Tidak Ditemukan';

  const pageHeader = {
    title: product.name || 'Nama Produk',
    breadcrumb: [
      { name: 'Beranda', href: routes.home },
      { name: 'Daftar Kategori', href: routes.categoryList },
      { name: categoryName, href: routes.categorySlug(categorySlug) },
    ],
  };

  return (
    <div className=" px-4 sm:px-6 md:px-10 xl:px-24">
      {/* <Container> */}
      <div className=" px-4 sm:px-6 lg:px-10 py-10">
        {/* Page Heading */}
        <PageHeader
          title=""
          breadcrumb={pageHeader.breadcrumb}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr,5fr] gap-10 w-full">
          {/* Product Gallery */}
          <div className="w-full lg:sticky top-24 h-max">
            <div className="w-full mb-2 font-semibold text-xl lg:text-2xl 4xl:text-[26px] text-customBlue">
              {product.name}
            </div>
            <div className="text-customBlue text-base lg:text-lg 4xl:text-[22px]">
              {product.catalog_id}
            </div>

            <Gallery images={product.ProductImage} />
          </div>

          {/* Product Info */}
          {/* Info Wrapper */}
          <div className="lg:px-20 rounded-md h-full">
            {product.eCatalogURL && (
              <div className="mt-4 flex justify-left mb-5">
                <a
                  href={product.eCatalogURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[250px] flex items-center justify-center bg-customBlue gap-1.5 text-sm font-semibold text-white rounded-md border border-slate-300 py-2 px-4 shadow-sm transition-all 
                            hover:text-white hover:bg-customBlue hover:border-slate-800 hover:shadow-lg"
                >
                  Lihat di e-Catalogue.lkpp
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>

                {/* <button onClick={ } className="flex items-center rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                  Homepage

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 ml-1.5">
                    <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                  </svg>
                </button> */}
              </div>
            )}
            <div className="flex flex-col justify-between border border-gray-300 rounded-md px-6 py-6 bg-white shadow-lg min-h-[500px] lg:min-h-[600px]">
              <Info product={product} />
            </div>
          </div>

        </div>



      </div>

      {/* </Container> */}
    </div>
  );
}
