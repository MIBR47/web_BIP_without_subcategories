"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchCategoryById, updateCategory } from "@/lib/api/categoryApi";
import { Categories, ShowedStatus } from "@/types";
import InputField from "@/components/form/inputField";
import SelectField from "@/components/form/selectField";
import { handleChange } from "@/lib/utils/formHandler";
import Image from 'next/image'

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

const CategoryEditPage = () => {
    const router = useRouter();
    const { id } = useParams();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [formData, setFormData] = useState<Categories>({
        id: 0,
        name: "",
        slug: "",
        remarks: "",
        iShowedStatus: ShowedStatus.Show,
        imageURL: "",
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<{
        type: "local" | "url";
        src: string;
    } | null>(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        if (!id) return;
        fetchCategoryById(Number(id))
            .then((data) => {
                setFormData(data);
                if (data.imageURL) {
                    setImagePreview({ type: "url", src: data.imageURL });
                }
            })
            .catch(() => setErrorMessage("Gagal memuat data kategori"))
            .finally(() => setLoading(false));
    }, [id]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview({ type: "local", src: URL.createObjectURL(file) });
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview(null);
        setFormData((prev) => ({ ...prev, imageURL: "" }));
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const form = new FormData();
        form.append("id", formData.id.toString());
        form.append("name", formData.name);
        form.append("slug", formData.slug);
        form.append("remarks", formData.remarks || "");
        form.append("iShowedStatus", formData.iShowedStatus);

        if (!imageFile && formData.imageURL) {
            form.append("imageURL", formData.imageURL);
        }

        if (imageFile) {
            form.append("file", imageFile);
        }

        setSaving(true);
        try {
            await updateCategory(form);
            router.push("/admin/categories");
        } catch (err: any) {
            const message = err?.message || "Gagal menyimpan perubahan";
            setErrorMessage(message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-4 text-center">Loading...</div>;

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

                    <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                        {/* Upload Image - sama dengan Create Page */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Image</label>

                            {imagePreview ? (
                                <>
                                    <div
                                        className="relative w-full max-w-2xl h-72 mx-auto overflow-hidden cursor-pointer hover:opacity-80 transition"
                                        onClick={() => setShowPreview(true)}
                                    >
                                        <Image
                                            src={
                                                imagePreview.type === "local"
                                                    ? imagePreview.src
                                                    : BASE_IMAGE_URL + imagePreview.src
                                            }
                                            alt="Preview"
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

                        <InputField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={(e) => handleChange(e, setFormData)}
                        />
                        <InputField
                            label="Slug"
                            name="slug"
                            value={formData.slug}
                            onChange={(e) => handleChange(e, setFormData)}
                        />
                        <InputField
                            label="Remarks"
                            name="remarks"
                            value={formData.remarks || ""}
                            onChange={(e) => handleChange(e, setFormData)}
                        />

                        <SelectField
                            label="Status Visibilitas"
                            name="iShowedStatus"
                            value={formData.iShowedStatus}
                            onChange={(e) => handleChange(e, setFormData)}
                            options={[
                                { value: "", label: "-- Pilih Status Visibilitas --" },
                                { value: "Show", label: "Tampilkan" },
                                { value: "Hidden", label: "Sembunyikan" },
                            ]}
                        />

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
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {errorMessage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
                        <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
                        <p className="text-gray-700 mb-6">{errorMessage}</p>
                        <div className="text-right">
                            <button
                                onClick={() => setErrorMessage(null)}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryEditPage;
