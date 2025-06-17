'use client'
import React from 'react';
import { useRouter } from 'next/navigation';


const NewsPage = () => {
  const router = useRouter();
  return (
    <div className="pt-2 px-4 pb-4 space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">News</h1>
        <button
          type="button"
          onClick={() => router.push("/admin/products/create")}
          className="bg-[#035ea2] hover:bg-[#024b85] text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Create News
        </button>
      </div>
    </div>
  );
};

export default NewsPage;
