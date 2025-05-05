"use client"
import React from 'react';
import { useRouter } from 'next/navigation';


const MessagesPage = () => {
  const router = useRouter();

  return (
    <div className='pt-2 px-4 pb-4 space-y-4'>
      <span className="font-bold text-4xl">Messages</span>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          type="button"
          onClick={() => router.push("/admin/products/create")}
          className="bg-[#035ea2] hover:bg-[#024b85] text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Create New Category
        </button>
      </div>

      <div className="border-dashed border border-zinc-500 w-full h-12 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
    </div>
  );
};

export default MessagesPage;
