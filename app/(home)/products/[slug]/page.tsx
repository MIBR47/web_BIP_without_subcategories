import { Metadata } from 'next';
import { ProductResponse } from '@/types';
import { routes } from '@/config/routes';

import { fetchCategoryById } from '@/lib/api/categoryApi';
import { getProductBySlug } from '@/lib/api/productApi';

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
  const product: ProductResponse = await getProductBySlug({
    slug: params.slug.trim(),
  });

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
    <div className="px-4 sm:px-6 md:px-10 xl:px-24">
      <div className="px-4 sm:px-6 lg:px-10 py-10">
        {/* Breadcrumb */}
        <PageHeader title="" breadcrumb={pageHeader.breadcrumb} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[4fr,5fr] gap-10 w-full">
          {/* Left: Gallery */}
          <div className="w-full lg:sticky top-24 h-max">
            <Gallery images={product.ProductImage} />
          </div>

          {/* Right: Info */}
          <div className="flex flex-col">
            {/* Title Section */}
            <div className="mb-6">
              <h1 className="text-2xl lg:text-3xl font-semibold text-customBlue leading-snug">
                {product.name}
              </h1>
              <p className="mt-1 text-lg text-gray-700">
                Kode Katalog:{" "}
                <span className="font-semibold">{product.catalog_id}</span>
              </p>
              {product.eCatalogURL && (
                <a
                  href={product.eCatalogURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-customBlue font-medium hover:underline"
                >
                  Lihat di LKPP eCatalog →
                </a>
              )}
            </div>

            {/* Info Card */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-md p-6 flex-1">
              <Info product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
