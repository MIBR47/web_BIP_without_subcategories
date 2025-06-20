"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import SelectField from "@/components/form/selectField";
import InputField from "@/components/form/inputField";
import TextAreaField from "@/components/form/textareaField";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL2}`;

const CreateCategoryPage = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        remarks: "",
        iStatus: "",
        iShowedStatus: "",
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview("");
        setFormData((prev) => ({
            ...prev,
            name: "",
            slug: "",
        }));
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim()) return toast.error("Nama kategori tidak boleh kosong.");
        if (!formData.slug.trim()) return toast.error("Slug tidak boleh kosong.");
        setIsLoading(true);

        try {
            if (!imageFile) {
                toast.error("Silakan pilih gambar kategori.");
                setIsLoading(false);
                return;
            }

            const formDataToSend = new FormData();
            formDataToSend.append("file", imageFile);
            formDataToSend.append("name", formData.name);
            formDataToSend.append("slug", formData.slug);
            formDataToSend.append("remarks", formData.remarks);
            formDataToSend.append("iStatus", formData.iStatus);
            formDataToSend.append("iShowedStatus", formData.iShowedStatus);

            const token = localStorage.getItem("authToken");
            if (!token) throw toast.error("Token tidak ditemukan");

            const res = await fetch(`${BASE_URL}/category/admin/create`, {
                method: "POST",
                headers: {
                    Authorization: token,
                },
                body: formDataToSend,
            });

            if (!res.ok) throw toast.error("Gagal submit kategori");

            toast.success("Category berhasil disimpan!");
            setFormData({ name: "", slug: "", remarks: "", iStatus: "", iShowedStatus: "" });
            setImageFile(null);
            setImagePreview("");
            if (fileInputRef.current) fileInputRef.current.value = "";
            router.push("/admin/categories");

        } catch (err: any) {
            console.error(err);
            let errorMessage = "Terjadi kesalahan saat menyimpan produk.";
            if (err instanceof Error) {
                errorMessage = err.message;
            } else if (err?.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err?.message) {
                errorMessage = err.message;
            }
            toast.error(errorMessage);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gray-50 flex flex-col">
            <div className="flex-grow flex justify-center items-start py-10 px-4 sm:px-8 lg:px-16">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-4xl bg-white p-8 sm:p-10 rounded-2xl shadow-lg space-y-6"
                >
                    <h2 className="text-3xl font-bold text-gray-800">Tambah Kategori</h2>

                    {/* Upload */}
                    <div className="flex flex-col items-center gap-4">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full border border-gray-300 rounded-xl p-2 text-sm"
                        />

                        {imagePreview && (
                            <div className="relative">
                                <img
                                    src={imagePreview}
                                    alt="preview"
                                    className="w-48 h-48 object-cover rounded-xl border shadow"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs hover:bg-red-700"
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Nama dan Slug */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField label="Nama Kategori" name="name" value={formData.name} onChange={handleChange} />
                        <InputField label="Slug" name="slug" value={formData.slug} onChange={handleChange} />
                    </div>

                    {/* Remarks */}
                    <TextAreaField label="Remarks" name="remarks" value={formData.remarks} onChange={handleChange} />

                    {/* Dropdown */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <SelectField
                            label="iStatus"
                            name="iStatus"
                            value={formData.iStatus}
                            onChange={handleChange}
                            options={[
                                { value: "", label: "-- Pilih Status --" },
                                { value: "Active", label: "Aktif" },
                                { value: "Inactive", label: "Nonaktif" },
                            ]}
                        />

                        <SelectField
                            label="iShowedStatus"
                            name="iShowedStatus"
                            value={formData.iShowedStatus}
                            onChange={handleChange}
                            options={[
                                { value: "", label: "-- Tampilkan di Frontend? --" },
                                { value: "Show", label: "Tampilkan" },
                                { value: "Hidden", label: "Sembunyikan" },
                            ]}
                        />
                    </div>

                    {/* Tombol */}
                    <div className="space-y-3">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg hover:bg-blue-700 transition flex items-center justify-center"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 mr-2 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                    </svg>
                                    Menyimpan...
                                </>
                            ) : (
                                "Simpan Kategori"
                            )}
                        </button>

                        <Link
                            href="/admin/categories"
                            className="block text-center w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition"
                        >
                            Kembali ke Daftar Kategori
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

// // Komponen Reusable
// function InputField({ label, name, value, onChange }: any) {
//     return (
//         <div>
//             <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
//                 {label}
//             </label>
//             <input
//                 type="text"
//                 id={name}
//                 name={name}
//                 value={value}
//                 onChange={onChange}
//                 className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//         </div>
//     );
// }



// function SelectField({ label, name, value, onChange, options }: any) {
//     return (
//         <div>
//             <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
//                 {label}
//             </label>
//             <select
//                 id={name}
//                 name={name}
//                 value={value}
//                 onChange={onChange}
//                 className="w-full border border-gray-300 rounded-xl p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//                 {options.map((opt: any) => (
//                     <option key={opt.value} value={opt.value}>
//                         {opt.label}
//                     </option>
//                 ))}
//             </select>
//         </div>
//     );
// }

export default CreateCategoryPage;
