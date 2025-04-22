import { Metadata } from 'next';
import getProductBySlug from '@/actions/get-productBySlug';
import getCategory from '@/actions/get-category';
import getCategories from '@/actions/get-categories';
import Container from '@/components/ui/container';
import Gallery from '@/components/gallery';
import Info from './_components/info';
import PageHeader from '@/components/ui/page-header';
import { routes } from '@/config/routes';
import { Products } from '@/types';

export const revalidate = 0;

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// export default async function ProductPage({ params }: ProductPageProps) {

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata | undefined> {
  const product: Products = await getProductBySlug({
    slug: params.slug.trim(),
    // descriptions: '',
  });
  // if (!product) {
  //   return;
  // }
  // const catalog: Products = product;

  // console.log(product)
  // console.log(product.catalog_id)
  // console.log(catalog)

  return {
    title: product.slug,
    description: product.ProductDesc.descriptions,
    openGraph: {
      title: product.slug,
      description: product.ProductDesc.descriptions,
      type: 'website',
      locale: 'id_ID',
      // url: `https://bipmed.vercel.app/${params.slug}`,
      siteName: 'bipmed',
      images: [
        {
          url: product.ProductImage[0].imageURL,
        },
        // {
        //   url: urlForImage(post?.body?.find((b: any) => b._type === "image")).width(1200).height(630).url(),
        //   width: 1200,
        //   height: 630,
        // },
      ],
    },
  };
}

// const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug({
    slug: params.slug.trim(),
    // descriptions: '',
  });

  console.log(product)


  if (!product) {
    return <div>Product not found</div>;
  }

  const categoryId = product.category_id;
  // const categories = await getCategories();

  // const categorySlug = categories.find(
  //   (category) => category.id === categoryId
  // )?.slug;
  // const category = await getCategory({ id: categoryId });

  // const categoryName = category?.name ? category.name : 'No category defined';

  const pageHeader = {
    title: product.name || 'Nama Produk',
    breadcrumb: [
      {
        name: 'Beranda',
        href: routes.home,
      },
      {
        name: 'Daftar Kategori',
        href: routes.cms.categoryList,
      },
      {
        name: `test`,
        // ${ categoryName[0].toUpperCase() + categoryName.slice(1) }
        href: routes.cms.categoryId(categoryId),
        // ...(categorySlug && { href: routes.cms.categorySlug(categorySlug) }),
      },
    ],
  };

  return (
    // <>
    //   <Head>
    //     <title>{product.name || 'Nama Produk'}</title>
    //     <meta
    //       name='Deskripsi produk'
    //       content={product.descriptions[0]?.descriptions || 'Deskripsi produk'}
    //     />
    //     <meta name='keywords' content={categoryName || 'Kategori produk'} />
    //     <meta name='afriza' content='bipmed' />
    //     {/* Optionally add other meta tags like og:title, og:description, og:image, etc. */}
    //   </Head>
    <div className='bg-white'>
      <Container>
        <div className='px-4 py-10 sm:px-6 lg:px-8 xl:px-10'>
          <PageHeader
            title={pageHeader.title}
            breadcrumb={pageHeader.breadcrumb}
          />
          <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
            <div className='w-full lg:sticky top-20 h-max'>
              <Gallery images={product.ProductImage} />
            </div>
            <div className='mt-5 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
              <Info product={product} />
            </div>
          </div>
        </div>
      </Container>
    </div>
    // </>
  );
}

// export default ProductPage;
