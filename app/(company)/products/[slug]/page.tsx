import { Metadata } from 'next';
import { Products } from '@/types';
import { routes } from '@/config/routes';

import getProductBySlug from '@/actions/get-productBySlug';
import { fetchCategoryById } from '@/lib/api/categoryApi';

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
  const product: Products = await getProductBySlug({ slug: params.slug.trim() });

  return {
    title: product.name,
    description: product.ProductDesc?.descriptions || 'Detail produk',
    openGraph: {
      title: product.name,
      description: product.ProductDesc?.descriptions || 'Detail produk',
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
      <div className='text-center py-24 text-red-600 text-lg'>
        Produk tidak ditemukan.
      </div>
    );
  }

  const category = await fetchCategoryById(parseInt(product.category_id));
  const categorySlug = category?.slug || '';
  const categoryName = category?.name || 'Kategori Tidak Ditemukan';

  const pageHeader = {
    title: product.name || 'Nama Produk',
    breadcrumb: [
      { name: 'Beranda', href: routes.home },
      { name: 'Daftar Kategori', href: routes.cms.categoryList },
      { name: categoryName, href: routes.cms.categorySlug(categorySlug) },
    ],
  };

  return (
    <div className='bg-[#f0f6ff]'>
      <Container>
        <div className='px-4 py-12 sm:px-6 lg:px-8 xl:px-10'>
          {/* Page Heading */}
          <PageHeader
            title={pageHeader.title}
            breadcrumb={pageHeader.breadcrumb}
          />

          {/* Main Content */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8'>
            {/* Product Gallery */}
            <div className='w-full lg:sticky top-24 h-max shadow-md rounded-lg border border-gray-200 p-4 bg-white'>
              <Gallery images={product.ProductImage} />
            </div>

            {/* Product Info */}
            <div className='flex flex-col justify-start'>
              <Info product={product} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
