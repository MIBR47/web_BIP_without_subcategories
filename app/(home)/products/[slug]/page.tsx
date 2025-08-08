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
    <div className="pt-10 px-4 sm:px-6 md:px-10 xl:px-24">
      {/* <Container> */}
      <div className=" px-4 sm:px-6 lg:px-10 py-10">
        {/* Page Heading */}
        <PageHeader
          title=""
          breadcrumb={pageHeader.breadcrumb}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8 ">
          {/* Product Gallery */}
          <div className="w-full lg:sticky top-24 h-max ">
            <div className="w-full mb-2 font-semibold text-xl lg:text-2xl 4xl:text-[26px] text-customBlue">
              {product.name}
            </div>
            <div className="text-customBlue text-base lg:text-lg 4xl:text-[22px]">
              {product.catalog_id}
            </div>

            <Gallery images={product.ProductImage} />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-start border border-gray-500 rounded-md px-6 bg-white shadow-lg">
            {/* <div className="w-full mb-6 text-customBlue" /> */}
            <Info product={product} />
          </div>
        </div>
      </div>
      {/* </Container> */}
    </div>
  );
}
