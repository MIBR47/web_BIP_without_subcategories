'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllProducts, getAllProductsAdmin } from '@/lib/api/productApi';
import ProductCard from './_components/productCard';
import { ProductResponse } from '@/types';

const MessagesPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProductsAdmin(page, limit);
        setProducts(res.data); // pastikan API return { data, total }
        setTotal(res.total);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="pt-2 px-4 pb-4 space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          type="button"
          onClick={() => router.push("/admin/products/create")}
          className="bg-[#035ea2] hover:bg-[#024b85] text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Create New Product
        </button>
      </div>

      <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12'>
        {products.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(prev => prev - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-sm text-gray-700">Page {page} of {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(prev => prev + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MessagesPage;
