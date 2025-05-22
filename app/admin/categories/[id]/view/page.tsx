"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchCategoryById } from '@/lib/api/categoryApi';
import { Categories } from '@/types';

const CategoryViewPage = () => {
    const router = useRouter();
    const { id } = useParams();
    const [category, setCategory] = useState<Categories | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        fetchCategoryById(Number(id))
            .then((data) => setCategory(data))
            .catch(() => setError('Gagal memuat data kategori'))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="p-6 text-center text-gray-500">Loading...</div>;
    if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

    return (
        <div className="min-h-screen w-full bg-gray-50 flex flex-col">
            <div className="flex-grow flex justify-center items-start py-10 px-4 sm:px-8 lg:px-16">
                <div className="w-full max-w-4xl bg-white p-8 sm:p-10 rounded-2xl shadow-lg space-y-6">
                    <button
                        onClick={() => router.back()}
                        className="mb-6 inline-block text-blue-600 hover:underline"
                    >
                        &larr; Back
                    </button>

                    <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Category Details</h1>

                    {category ? (
                        <div className="space-y-8 text-gray-800">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                                <img
                                    src={category.imageURL || '/placeholder.png'}
                                    alt={category.name}
                                    className="w-40 h-40 sm:w-48 sm:h-48 rounded-xl object-contain border border-gray-300 flex-shrink-0"
                                    loading="lazy"
                                />


                                <div>
                                    <h2 className="text-3xl font-semibold">{category.name}</h2>
                                    <p className="text-sm text-gray-500 mt-1">Slug: {category.slug}</p>
                                    <div className='mt-4'>
                                        <h3 className="font-semibold text-sm">Remarks</h3>
                                        <p className="text-gray-700 text-sm">{category.remarks || '-'}</p>
                                    </div>
                                    <div className=" flex flex-row mt-4 space-x-4">


                                        <div>
                                            <h3 className="font-semibold text-sm">Status</h3>
                                            <span
                                                className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${category.iStatus === 'Active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}
                                            >
                                                {category.iStatus}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-sm">Showed Status</h3>
                                            <span
                                                className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${category.iShowedStatus === 'Show'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}
                                            >
                                                {category.iShowedStatus}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-gray-600">No data found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryViewPage;
