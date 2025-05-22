"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { fetchCategoryById, updateCategory } from '@/lib/api/categoryApi'; // updateCategory: API untuk update
import { Categories } from '@/types';

const CategoryEditPage = () => {
    const router = useRouter();
    const { id } = useParams();

    const [category, setCategory] = useState<Categories | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        fetchCategoryById(Number(id))
            .then((data) => setCategory(data))
            .catch(() => setError('Gagal memuat data kategori'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!category) return;

        setSaving(true);
        setError(null);
        try {
            await updateCategory(category.id, category);
            router.push('/admin/categories');
        } catch {
            setError('Gagal menyimpan perubahan');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-4 text-center">Loading...</div>;
    if (error) return <div className="p-4 text-center text-red-600">{error}</div>;

    return (
        <div className="min-h-screen w-full bg-gray-50 flex flex-col">
            <div className="flex-grow flex justify-center items-start py-10 px-4 sm:px-8 lg:px-16">
                <div className="w-full max-w-4xl bg-white p-8 sm:p-10 rounded-2xl shadow-lg space-y-6">
                    <button
                        onClick={() => router.back()}
                        className="mb-4 text-blue-600 hover:underline"
                    >
                        &larr; Back
                    </button>

                    <h1 className="text-3xl font-semibold mb-6">Edit Category</h1>

                    {category && (
                        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                            <div>
                                <label htmlFor="name" className="block font-medium mb-1">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={category.name}
                                    onChange={(e) =>
                                        setCategory({ ...category, name: e.target.value })
                                    }
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="slug" className="block font-medium mb-1">
                                    Slug <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="slug"
                                    type="text"
                                    value={category.slug}
                                    onChange={(e) =>
                                        setCategory({ ...category, slug: e.target.value })
                                    }
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="remarks" className="block font-medium mb-1">
                                    Remarks
                                </label>
                                <textarea
                                    id="remarks"
                                    value={category.remarks || ''}
                                    onChange={(e) =>
                                        setCategory({ ...category, remarks: e.target.value })
                                    }
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    disabled={saving}
                                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
                                >
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>

                            {error && <p className="text-red-600 text-center mt-2">{error}</p>}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryEditPage;
