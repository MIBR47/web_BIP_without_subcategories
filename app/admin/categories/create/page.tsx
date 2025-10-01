"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import SelectField from "@/components/form/selectField";
import InputField from "@/components/form/inputField";
import TextAreaField from "@/components/form/textareaField";
import Image from 'next/image'

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

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
    const [showPreview, setShowPreview] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
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
            toast.error("Terjadi kesalahan saat menyimpan kategori.");
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
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Image</label>

                        {imagePreview ? (
                            <>
                                <div
                                    className="relative w-full max-w-2xl h-72 mx-auto overflow-hidden cursor-pointer hover:opacity-80 transition"
                                    onClick={() => setShowPreview(true)}
                                >
                                    <Image
                                        src={imagePreview}
                                        alt="Uploaded"
                                        width={600} // misalnya 600px
                                        height={400} 
                                        className="w-full h-full object-contain bg-white"
                                    />
                                </div>
                                <button
                                    onClick={handleRemoveImage}
                                    type="button"
                                    className="mt-2 text-sm text-red-600 hover:underline"
                                >
                                    🗑 Hapus Gambar
                                </button>
                            </>
                        ) : (
                            <label className="w-full h-72 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 text-gray-500">
                                + Pilih Gambar
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
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
                            label="Status Visibilitass"
                            name="iShowedStatus"
                            value={formData.iShowedStatus}
                            onChange={handleChange}
                            options={[
                                { value: "", label: "-- Pilih Status Visibilitas --" },
                                { value: "Show", label: "Tampilkan" },
                                { value: "Hidden", label: "Sembunyikan" },
                            ]}
                        />
                    </div>

                    {/* Tombol Aksi */}
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

            {/* Fullscreen Image Modal */}
            {showPreview && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
                    onClick={() => setShowPreview(false)}
                >
                    <div className="relative max-w-full max-h-full p-4">
                        <Image
                            src={imagePreview}
                            alt="Preview"
                            height={1000}
                            width={1000}
                            className="max-w-full max-h-screen object-contain rounded-xl"
                        />
                        <button
                            className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowPreview(false);
                            }}
                        >
                            ❌
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateCategoryPage;
