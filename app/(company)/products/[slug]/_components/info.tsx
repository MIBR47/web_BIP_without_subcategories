import { Product } from '@/types';
import Link from 'next/link';
// import Head from 'next/head';
import SpectoDownload from './specdownload';
import './style.css';

interface InfoProps {
  product: Product; // Assuming data is of type Products
}

const Info: React.FC<InfoProps> = async ({ product }) => {
  if (!product) {
    return <div>Product doesn&apos;t exist...</div>;
  }
  // const productdescs =
  //   product.descriptions.map((desc) => desc.descriptions) || '';

  const nonPrimaryImages = product.ProductImage.filter(
    (image) => image.isPrimary === false
  );
  const nonPrimaryImage =
    nonPrimaryImages.length > 0 ? nonPrimaryImages[0] : null;

  return (
    <>
      {/* <Head>
        <title>{product.name.trim()} - bipmed</title>
        <meta
          name='description'
          content={
            productdescs
              ? productdescs.join(' ')
              : `Find out more about ${product.name.trim()} in our catalog.`
          }
        />
        <meta name='keywords' content='product, catalog, e-Catalogue, lkpp' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head> */}

      {/* <div className='bg-background'> */}
      <div className='text-1xl text-gray-900 text-left justify-center'>
        Katalog : {product.catalog_id}
        <h1 className='text-2xl text-left font-semibold text-gray-600 mb-3'>
          {product.name.trim()}
        </h1>
        {nonPrimaryImage && (
          <SpectoDownload
            fileUrl={nonPrimaryImage.imageURL}
            filename={`${product.catalog_id.trim()}_bipmed.jpg`}
            title='Download Spesifikasi Produk'
          />
        )}
      </div>

      <div className='mt-5'>
        {product.ecatalog_URL ? (
          <>
            <Link
              href={product.ecatalog_URL}
              className='text-customBlue font-semibold desktop-caption'
              target='_blank'
              rel='noopener noreferrer'
            >
              Lihat produk ini di e-Catalogue.lkpp
            </Link>
            <Link
              href={product.ecatalog_URL}
              className='text-customBlue font-semibold mobile-caption'
              target='_blank'
              rel='noopener noreferrer'
            >
              Lihat di e-Catalogue.lkpp
            </Link>
          </>
        ) : null}
      </div>
      {product.ProductDesc && (
        <div>
          <h2 className='text-lg font-semibold mb-5 underline mt-10'>
            Deskripsi dan Fitur
          </h2>
          <div className='text-sm' dangerouslySetInnerHTML={{ __html: product.ProductDesc.descriptions }}>
            {/* {product.descriptions.descriptions} */}

          </div>


        </div>
      )}
      {/* </div> */}
    </>
  );
};

export default Info;
