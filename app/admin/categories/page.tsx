"use client";

import { deleteCategoryById, fetchCategoriesAllAdmin } from '@/lib/api/categoryApi';
import { Categories } from '@/types';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, startTransition } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image'
import { BASE_IMAGE_URL } from '../../../lib/global_constant';

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  // const [categoryDetail, setCategoryDetail] = useState<Categories | null>(null);
  // const [editingCategory, setEditingCategory] = useState<Categories | null>(null);
  // const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  // const [viewModalOpen, setViewModalOpen] = useState(false);
  // const [editModalOpen, setEditModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [navigating, setNavigating] = useState(false);





  const router = useRouter();
  const getCategories = async () => {
    try {
      const data: any = await fetchCategoriesAllAdmin();
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

  const handleNavigate = (url: string) => {
    setNavigating(true);
    startTransition(() => {
      router.push(url);
    });
  };



  // const handleView = async (id: number) => {
  //   try {
  //     const data = await fetchCategoryById(id);
  //     setCategoryDetail(data);
  //     setViewModalOpen(true);
  //   } catch (err) {
  //     setError(`Failed to fetch category details.`);
  //   }
  // };

  // const handleEdit = (category: Categories) => {
  //   setEditingCategory(category);
  //   setEditModalOpen(true);
  // };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (!editingCategory) return;

  //   setCategories(prev =>
  //     prev.map(cat => (cat.id === editingCategory.id ? editingCategory : cat))
  //   );
  //   setEditingCategory(null);
  //   setEditModalOpen(false);
  // };

  const handleDelete = (id: number) => {
    toast.custom((t) => (
      <div className={`bg-white border shadow-md rounded-lg p-4 w-[320px] ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
        <p className="text-sm font-medium text-gray-800">Are you sure you want to delete this category?</p>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id); // Tutup toast konfirmasi

              const toastId = toast.loading("Deleting category...");
              try {
                await deleteCategoryById(id);
                setCategories((prev) => prev.filter((cat) => cat.id !== id));
                toast.success("Category deleted successfully", { id: toastId });
              } catch (error) {
                toast.error("Failed to delete category.", { id: toastId });
                console.error(error);
              }
            }}
            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded"
          >
            <CheckCircle2 size={14} /> Yes, Delete
          </button>

          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs px-3 py-1.5 rounded"
          >
            <XCircle size={14} /> Cancel
          </button>
        </div>
      </div>
    ), {
      position: 'top-center',
      duration: 10000, // biar gak langsung hilang
    });
  };
  // const handleCancelEdit = () => {
  //   setEditingCategory(null);
  //   setEditModalOpen(false);
  // };
  const toggleDropdown = (id: number) => {
    setOpenDropdownId(prev => (prev === id ? null : id));
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
              onClick={() => handleNavigate("/admin/categories/create")}
              className="bg-[#035ea2] hover:bg-[#024b85] text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
              disabled={navigating}
            >
              {navigating ? "Navigating..." : "Create New Category"}
            </button>
          </div>

          {/* <div className="overflow-x-auto overflow-y-visible"> */}

          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-[#035ea2] text-white">
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Name</th>
                {/* <th className="py-2 px-4 border">Slug</th> */}
                <th className="py-2 px-4 border">Remarks</th>
                {/* <th className="py-2 px-4 border">Status</th> */}
                <th className="py-2 px-4 border">Showed Status</th>
                <th className="py-2 px-4 border">Image</th>
                <th className="py-2 px-4 border"></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr
                  key={category.id}
                  className={`bg-white border-b cursor-pointer hover:bg-blue-50 ${navigating ? 'opacity-50 pointer-events-none' : ''}`}
                  onClick={() => handleNavigate(`/admin/categories/${category.id}/view`)}
                >

                  <td className="py-2 px-4 text-center">{index + 1}</td>
                  <td className="py-2 px-4">{category.name}</td>
                  {/* <td className="py-2 px-4">{category.slug}</td> */}
                  <td className="py-2 px-4">{category.remarks || "-"}</td>
                  {/* <td className="py-2 px-4 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold 
            ${category.iStatus === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                          }`}
                      >
                        {category.iStatus}
                      </span>
                    </td> */}
                  <td className="py-2 px-4 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold 
                         ${category.iShowedStatus === "Show"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                        }`}
                    >
                      {category.iShowedStatus}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <Image
                      src={BASE_IMAGE_URL + category.imageURL}
                      alt={category.name}
                      width={12}
                      height={12}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </td>
                  <td
                    className="py-2 px-4 text-center relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="bg-white hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded"
                      onClick={() => toggleDropdown(category.id)}
                    >
                      Atur ▼
                    </button>

                    {openDropdownId === category.id && (
                      <div className="absolute right-0 z-10 mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg">
                        <button
                          onClick={() => {
                            setOpenDropdownId(null);
                            handleNavigate(`/admin/categories/${category.id}/edit`);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            setOpenDropdownId(null);
                            handleDelete(category.id);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Hapus
                        </button>
                      </div>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
          {/* </div> */}

          {/* Modal View */}
          {/* <Dialog open={viewModalOpen} onClose={() => setViewModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
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
                  <Image
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
          </Dialog> */}

          {/* Modal Edit */}
          {/* <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
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
          </Dialog> */}
        </>
      )}
    </div>
  );
};

export default CategoriesPage;
