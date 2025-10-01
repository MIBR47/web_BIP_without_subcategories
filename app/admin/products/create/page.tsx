"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { UploadCloud } from "lucide-react";
import { fetchCategoriesAll } from "@/lib/api/categoryApi";
import { handleImageChange, handleRemoveImage } from "@/lib/utils/imageHandler";
import { handleChange } from "@/lib/utils/formHandler";
import { ProductDescRequest } from "@/types";
import "react-quill/dist/quill.snow.css";
import RichTextEditorField from "@/components/form/RichTextEditorField";
import { useRouter } from "next/navigation";
import { createProduct, uploadDescriptions, uploadImages } from "@/lib/api/productApi";
import { toast } from "react-hot-toast";
import SelectField from "@/components/form/selectField";
import InputField from "@/components/form/inputField";
import Image from "next/image";

export interface ProductForm {
    name: string;
    slug: string;
    eCatalogURL: string;
    iShowedStatus: "Show" | "Hidden";
    category_id: number;
    catalog_id: string;
}

interface Category {
    id: number;
    name: string;
}

const CreateProductPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<ProductForm>({
        catalog_id: "",
        name: "",
        slug: "",
        eCatalogURL: "",
        iShowedStatus: "Show",
        category_id: 0,
    });

    const [formDataDesc, setFormDataDesc] = useState<ProductDescRequest & { mode: "form" | "json" }>({
        other_info: "",
        productSpec: [],
        mode: "form", // default form
    });

    const [categories, setCategories] = useState<Category[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [primaryIndex, setPrimaryIndex] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const getCategories = async () => {
        try {
            const data: any = await fetchCategoriesAll();
            setCategories(data);
        } catch (err) {
            console.error("Gagal mengambil kategori");
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleChangeDesc = (name: string, value: string) => {
        setFormDataDesc((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddSpec = () => {
        setFormDataDesc((prev) => ({
            ...prev,
            productSpec: [...prev.productSpec, { label: "", value: "" }],
        }));
    };

    const handleSpecChange = (index: number, field: "label" | "value", value: string) => {
        const updated = [...formDataDesc.productSpec];
        updated[index][field] = value;
        setFormDataDesc((prev) => ({ ...prev, productSpec: updated }));
    };

    const handleRemoveSpec = (index: number) => {
        const updated = [...formDataDesc.productSpec];
        updated.splice(index, 1);
        setFormDataDesc((prev) => ({ ...prev, productSpec: updated }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, "").trim();

        if (!formData.name.trim()) return toast.error("Nama produk tidak boleh kosong.");
        if (!formData.slug.trim()) return toast.error("Slug tidak boleh kosong.");
        if (!formData.catalog_id.trim()) return toast.error("Catalog ID tidak boleh kosong.");
        if (!formData.eCatalogURL.trim()) return toast.error("Link e-Catalog tidak boleh kosong.");
        if (!formData.category_id || formData.category_id === 0) return toast.error("Kategori harus dipilih.");

        if (!stripHtml(formDataDesc.other_info)) return toast.error("Deskripsi produk tidak boleh kosong.");
        if (!formDataDesc.productSpec || formDataDesc.productSpec.length === 0)
            return toast.error("Minimal 1 spesifikasi produk harus diisi.");

        for (const spec of formDataDesc.productSpec) {
            if (!spec.label?.trim() || !spec.value?.trim()) {
                return toast.error("Semua spesifikasi harus diisi lengkap.");
            }
        }

        if (imageFiles.length === 0) return toast.error("Minimal 1 gambar harus diupload.");
        if (primaryIndex === null) return toast.error("Pilih gambar utama (primary).");

        setIsLoading(true);
        try {
            const productId = await createProduct(formData);
            await uploadImages(productId, imageFiles, primaryIndex);
            await uploadDescriptions(productId, formDataDesc);

            toast.success("Produk berhasil disimpan!");
            router.push("/admin/products");
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
        <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow space-y-8"
            >
                <h2 className="text-3xl font-bold text-gray-800">Tambah Produk</h2>

                {/* Upload Gambar */}
                <section className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700">Upload Gambar</label>
                    <div>
                        <input
                            ref={fileInputRef}
                            id="imageUpload"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) =>
                                handleImageChange(e, setImageFiles, setImagePreviews, setPrimaryIndex, imagePreviews.length)
                            }
                            className="hidden"
                            disabled={imagePreviews.length >= 4}
                        />
                        <label
                            htmlFor="imageUpload"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 cursor-pointer"
                        >
                            <UploadCloud className="w-5 h-5" />
                            Upload Gambar
                        </label>
                    </div>

                    {imagePreviews.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                            {imagePreviews.map((src, i) => (
                                <div key={i} className="relative group">
                                    <Image
                                        src={src}
                                        alt={`product image ${i + 1}`}
                                        width={100}
                                        height={150}
                                        className={`w-full h-40 object-cover rounded-xl border ${primaryIndex === i ? "ring-4 ring-blue-500" : "border-gray-300"
                                            }`}
                                    />
                                    <button
                                        onClick={() =>
                                            handleRemoveImage(i, setImageFiles, setImagePreviews, primaryIndex, setPrimaryIndex)
                                        }
                                        type="button"
                                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-xs opacity-90 hover:opacity-100"
                                    >
                                        ✕
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPrimaryIndex(i)}
                                        className={`absolute bottom-1 left-1 text-xs px-2 py-1 rounded bg-white shadow ${primaryIndex === i ? "text-blue-600 font-bold" : "text-gray-700"
                                            }`}
                                    >
                                        {primaryIndex === i ? "Primary" : "Set Primary"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    {imagePreviews.length >= 4 && <p className="text-sm text-gray-500">Maksimal 4 gambar</p>}
                </section>

                {/* Input Fields */}
                <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Nama Produk" name="name" value={formData.name} onChange={(e) => handleChange(e, setFormData)} />
                    <InputField label="Slug" name="slug" value={formData.slug} onChange={(e) => handleChange(e, setFormData)} />
                    <InputField label="Catalog ID" name="catalog_id" value={formData.catalog_id} onChange={(e) => handleChange(e, setFormData)} />
                    <InputField label="Link e-Catalog" name="eCatalogURL" value={formData.eCatalogURL} onChange={(e) => handleChange(e, setFormData)} />
                    <SelectField
                        label="Kategori"
                        name="category_id"
                        value={formData.category_id}
                        onChange={(e) => handleChange(e, setFormData)}
                        options={[{ value: 0, label: "-- Pilih Kategori --" }, ...categories.map((c) => ({ value: c.id, label: c.name }))]}
                    />
                </section>

                {/* Spesifikasi Produk */}
                <section className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-gray-700">Spesifikasi Produk</label>
                        <button
                            type="button"
                            onClick={() =>
                                setFormDataDesc((prev) => ({
                                    ...prev,
                                    mode: prev.mode === "json" ? "form" : "json",
                                }))
                            }
                            className="text-sm px-3 py-1 rounded-lg border bg-gray-100 hover:bg-gray-200"
                        >
                            {formDataDesc.mode === "json" ? "Gunakan Form" : "Gunakan JSON"}
                        </button>
                    </div>

                    {formDataDesc.mode === "form" ? (
                        <>
                            <div className="space-y-2">
                                {formDataDesc.productSpec.map((spec, i) => (
                                    <div
                                        key={i}
                                        className="grid grid-cols-12 gap-2 items-center bg-gray-50 p-3 rounded-xl border border-gray-200"
                                    >
                                        <input
                                            type="text"
                                            placeholder="Label"
                                            value={spec.label}
                                            onChange={(e) => handleSpecChange(i, "label", e.target.value)}
                                            className="col-span-5 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Value"
                                            value={spec.value}
                                            onChange={(e) => handleSpecChange(i, "value", e.target.value)}
                                            className="col-span-5 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSpec(i)}
                                            className="col-span-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={handleAddSpec}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                + Tambah Spesifikasi
                            </button>
                        </>
                    ) : (
                        <textarea
                            className="w-full border border-gray-300 rounded-lg p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={6}
                            placeholder={`Contoh:\n[\n  { "label": "Berat", "value": "1kg" },\n  { "label": "Warna", "value": "Merah" }\n]`}
                            value={JSON.stringify(formDataDesc.productSpec, null, 2)}
                            onChange={(e) => {
                                try {
                                    const parsed = JSON.parse(e.target.value);
                                    if (Array.isArray(parsed)) {
                                        setFormDataDesc((prev) => ({ ...prev, productSpec: parsed }));
                                    }
                                } catch {
                                    // ignore error
                                }
                            }}
                        />
                    )}
                </section>

                {/* Deskripsi Produk */}
                <RichTextEditorField
                    label="Informasi Tambahan"
                    name="other_info"
                    content={formDataDesc.other_info}
                    onChange={handleChangeDesc}
                />

                {/* Actions */}
                <div className="space-y-3">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 rounded-xl text-lg ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                    >
                        {isLoading ? "Menyimpan..." : "Simpan Produk"}
                    </button>
                    <Link
                        href="/admin/products"
                        className="block text-center w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200"
                    >
                        Kembali ke Daftar Produk
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default CreateProductPage;
