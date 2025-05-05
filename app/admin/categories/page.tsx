"use client";

import { fetchCategoriesAll, fetchCategoryById } from '@/lib/api/categoryApi';
import { Categories, Status } from '@/types';
import { Dialog } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [categoryDetail, setCategoryDetail] = useState<Categories | null>(null);
  const [editingCategory, setEditingCategory] = useState<Categories | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const getCategories = async () => {
    try {
      const data: any = await fetchCategoriesAll();
      setCategories(data);
    } catch (err) {
      setError('Failed to fetch categories.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  const handleView = async (id: number) => {
    try {
      const data = await fetchCategoryById(id);
      setCategoryDetail(data);
      setViewModalOpen(true);
    } catch (err) {
      setError(`Failed to fetch category details.`);
    }
  };

  const handleEdit = (category: Categories) => {
    setEditingCategory(category);
    setEditModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingCategory) return;

    setCategories(prev =>
      prev.map(cat => (cat.id === editingCategory.id ? editingCategory : cat))
    );
    setEditingCategory(null);
    setEditModalOpen(false);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditModalOpen(false);
  };

  return (
    <div className="pt-2 px-4 pb-4 space-y-4">



      {/* Loading & Error Handling */}
      {loading ? (
        <div className="text-center py-10 text-blue-500 font-semibold">Loading categories...</div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-10 space-y-4">
          <p className="text-red-500 font-semibold">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setLoading(true);
              getCategories();
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Coba Lagi
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Categories</h1>
            <button
              type="button"
              onClick={() => router.push("/admin/categories/create")}
              className="bg-[#035ea2] hover:bg-[#024b85] text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Create New Category
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-[#035ea2] text-white">
                  <th className="py-2 px-4 border">ID</th>
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Slug</th>
                  <th className="py-2 px-4 border">Remarks</th>
                  <th className="py-2 px-4 border">Status</th>
                  <th className="py-2 px-4 border">Showed Status</th>
                  <th className="py-2 px-4 border">Image</th>
                  <th className="py-2 px-4 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="bg-white border-b">
                    <td className="py-2 px-4 text-center">{category.id}</td>
                    <td className="py-2 px-4">{category.name}</td>
                    <td className="py-2 px-4">{category.slug}</td>
                    <td className="py-2 px-4">{category.remarks}</td>
                    <td className="py-2 px-4 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold 
                        ${category.iStatus === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {category.iStatus}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold 
                        ${category.iShowedStatus === "Show" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {category.iShowedStatus}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <img
                        src={category.imageURL}
                        alt={category.name}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    </td>
                    <td className="py-2 px-4 text-center space-x-2">
                      <button
                        onClick={() => handleView(category.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(category)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal View */}
          <Dialog open={viewModalOpen} onClose={() => setViewModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="relative bg-white rounded-lg p-6 w-96">
              <h2 className="text-xl font-bold mb-4">Category Details</h2>
              {categoryDetail && (
                <div className="space-y-2">
                  <p><strong>Name:</strong> {categoryDetail.name}</p>
                  <p><strong>Slug:</strong> {categoryDetail.slug}</p>
                  <p><strong>Remarks:</strong> {categoryDetail.remarks}</p>
                  <p><strong>Status:</strong> {categoryDetail.iStatus}</p>
                  <p><strong>Showed Status:</strong> {categoryDetail.iShowedStatus}</p>
                  <img
                    src={categoryDetail.imageURL}
                    alt={categoryDetail.name}
                    className="w-32 h-32 object-cover rounded-full mx-auto mt-4"
                  />
                </div>
              )}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setViewModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </Dialog>

          {/* Modal Edit */}
          <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="relative bg-white rounded-lg p-6 w-96">
              <h2 className="text-xl font-bold mb-4">Edit Category</h2>
              {editingCategory && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                      type="text"
                      value={editingCategory.name}
                      onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Slug</label>
                    <input
                      type="text"
                      value={editingCategory.slug}
                      onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Remarks</label>
                    <input
                      type="text"
                      value={editingCategory.remarks}
                      onChange={(e) => setEditingCategory({ ...editingCategory, remarks: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default CategoriesPage;
