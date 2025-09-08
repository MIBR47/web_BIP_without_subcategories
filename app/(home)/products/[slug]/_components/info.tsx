'use client';

import { useState } from 'react';
import { ProductResponse } from '@/types';
import SpectoDownload from './specdownload';

interface InfoProps {
  product: ProductResponse;
}

const Info: React.FC<InfoProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<'detail' | 'additional'>('detail');

  // Cari fitur spesifikasi kalau ada (misal product.ProductDesc.productSpec)
  const productInfo = product.ProductDesc?.other_info || '';
  const productSpec = product.ProductDesc?.productSpec || '';

  // Contoh konten “Informasi Tambahan” yang bisa kamu ganti sesuai kebutuhan
  const additionalInfo = [
    { label: 'Kategori', value: product.category_id },
    { label: 'Status', value: product.iShowedStatus },
    { label: 'Tersedia', value: product.iShowedStatus },
    // Tambahkan field lain di sini jika diperlukan…
  ];

  // Ambil gambar non-primer untuk tombol download
  const nonPrimaryImages = product.ProductImage.filter((img) => !img.isPrimary);
  const nonPrimaryImage = nonPrimaryImages.length > 0 ? nonPrimaryImages[0] : null;

  return (
    <div className="w-full">
      {/* Tab Menus */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-1" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('detail')}
            className={`py-2 px-4 font-medium text-sm ${activeTab === 'detail'
              ? 'border-b-2 border-customBlue text-customBlue'
              : 'border-b-2 border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
              }`}
          >
            Produk Detail
          </button>
          <button
            onClick={() => setActiveTab('additional')}
            className={`py-2 px-4 font-medium text-sm ${activeTab === 'additional'
              ? 'border-b-2 border-customBlue text-customBlue'
              : 'border-b-2 border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
              }`}
          >
            Informasi Tambahan
          </button>
        </nav>
      </div>

      {/* Konten Tab */}
      <div className="mt-6">
        {activeTab === 'detail' && (
          <div className="space-y-8">
            {/* Katalog & Nama Produk */}
            {/* <div className="text-gray-900">
              <p className="text-sm text-gray-500">
                Katalog: <span className="font-semibold">{product.catalog_id}</span>
              </p>
              <h1 className="text-2xl font-semibold text-gray-700">{product.name.trim()}</h1>
            </div> */}

            {/* Tombol Download Spesifikasi (jika ada) */}
            {/* {nonPrimaryImage && (
              <div className="mt-4">
                <SpectoDownload
                  fileUrl={nonPrimaryImage.imageURL}
                  filename={`${product.catalog_id.trim()}_bipmed.jpg`}
                  title="Download Spesifikasi Produk"
                />
              </div>
            )} */}



            {/* <div className="prose prose-sm font-semibold text-gray-700">Catalog : {product.catalog_id}</div> */}


            {/* Spesifikasi Produk (jika ada) */}
            {productSpec && (
              <div>
                <h2 className="text-lg font-semibold mb-3">Spesifikasi</h2>
                <div
                  className="prose prose-sm text-gray-700"
                  dangerouslySetInnerHTML={{ __html: productSpec }}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'additional' && (
          <div className="space-y-4 text-gray-700 ">
            {/* <h2 className="text-lg font-semibold mb-3">Informasi Tambahan</h2> */}
            {/* Link e-Catalogue (jika ada) */}

            {/* Deskripsi */}
            {productInfo && (
              <div>
                {/* <h2 className="text-lg font-semibold mb-3">Deskripsi dan Fitur</h2> */}
                <div
                  className="prose prose-sm text-gray-700"
                  dangerouslySetInnerHTML={{ __html: productInfo }}
                />
              </div>
            )}
            {/* <ul className="space-y-2">
              {additionalInfo.map((info) => (
                <li key={info.label} className="flex justify-between border-b pb-2">
                  <span className="font-medium">{info.label}</span>
                  <span>{info.value}</span>
                </li>
              ))}
            </ul> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Info;
