'use client';

import React, { useState, useEffect, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import { News } from '@/types';
// import { fetchNewsAllAdmin, deleteNewsBySlug } from '@/lib/api/newsApi';
import { toast } from 'react-hot-toast';
import { XCircle, CheckCircle2 } from 'lucide-react';
// import { deleteCategoryById } from '@/lib/api/categoryApi';
import { deleteNewsBySlug, fetchNewsAllAdmin } from '@/lib/api/newsApi';
import Image from 'next/image'
import { BASE_IMAGE_URL } from '@/lib/global_constant';

const ListBeritaPageAdmin = () => {
  const router = useRouter();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [navigating, setNavigating] = useState(false);

  const getNews = async () => {
    try {
      const data: any = await fetchNewsAllAdmin();
      setNews(data);
    } catch (err) {
      setError('Failed to fetch news.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (slug: string) => {
    toast.custom((t) => (
      <div className={`bg-white border shadow-md rounded-lg p-4 w-[320px] ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
        <p className="text-sm font-medium text-gray-800">Are you sure you want to delete this news?</p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const toastId = toast.loading("Deleting news...");
              try {
                await deleteNewsBySlug(slug);
                setNews((prev) => prev.filter((n) => n.slug !== slug));
                toast.success("News deleted successfully", { id: toastId });
              } catch (error) {
                toast.error("Failed to delete news.", { id: toastId });
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
      duration: 10000,
    });
  };
  const toggleDropdown = (slug: string) => {
    setOpenDropdownId(prev => (prev === slug ? null : slug));
  };
  const handleNavigate = (url: string) => {
    setNavigating(true);
    startTransition(() => {
      router.push(url);
    });
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="pt-2 px-4 pb-4 space-y-4">
      {loading ? (
        <div className="text-center py-10 text-blue-500 font-semibold">Loading News...</div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-10 space-y-4">
          <p className="text-red-500 font-semibold">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setLoading(true);
              getNews();
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Coba Lagi
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">News</h1>
            <button
              type="button"
              onClick={() => handleNavigate("/admin/news/create")}
              className="bg-[#035ea2] hover:bg-[#024b85] text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
              disabled={navigating}
            >
              {navigating ? "Navigating..." : "Create News"}
            </button>
          </div>
          {/* <div className="overflow-x-auto"> */}
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-[#035ea2] text-white">
                <th className="py-2 px-4 border">No.</th>
                <th className="py-2 px-4 border">Title</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Showed Status</th>
                <th className="py-2 px-4 border">Image</th>
                <th className="py-2 px-4 border"></th>
              </tr>
            </thead>
            <tbody>
              {news.map((item, index) => (
                <tr
                  key={item.slug}
                  className={`bg-white border-b cursor-pointer hover:bg-blue-50 ${navigating ? 'opacity-50 pointer-events-none' : ''}`}
                  onClick={() => handleNavigate(`/admin/news/${item.slug}/view`)}
                >
                  <td className="py-2 px-4 text-center">{index + 1}</td>
                  <td className="py-2 px-4">{item.title}</td>
                  <td className="py-2 px-4">
                    {item.newsDate
                      ? new Date(item.newsDate).toLocaleDateString("id-ID", {
                        timeZone: "Asia/Jakarta",
                      })
                      : "-"}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold 
                        ${item.iShowedStatus === "Show"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                        }`}
                    >
                      {item.iShowedStatus}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <Image
                      src={BASE_IMAGE_URL + item.imageURL}
                      alt={item.title}
                      width={25}
                      height={25}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </td>
                  {/* <td className="py-2 px-4 text-center space-x-2">
                      <button
                        onClick={() => handleNavigate(`/admin/news/${item.slug}/edit`)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleNavigate(item.slug)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                      >
                        Delete
                      </button>
                    </td> */}
                  <td
                    className="py-2 px-4 text-center relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="bg-white hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded"
                      onClick={() => toggleDropdown(item.slug)}
                    >
                      Atur ▼
                    </button>

                    {openDropdownId === item.slug && (
                      <div className="absolute right-0 z-10 mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg">
                        <button
                          onClick={() => {
                            setOpenDropdownId(null);
                            handleNavigate(`/admin/news/${item.slug}/edit`);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            setOpenDropdownId(null);
                            handleDelete(item.slug);
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
        </>
      )}
    </div>
  );
};

export default ListBeritaPageAdmin;
