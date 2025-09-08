"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ProductResponse,
    ProductDescRequest,
    UpdateProductRequest,
} from '@/types';
import {
    getProductBySlug,
    updateProduct,
    updateProductDesc,
    deleteProductImageById,
    uploadImages,
    updateProductImage,
} from "@/lib/api/productApi";
import RichTextEditorField from "../../../../../components/form/RichTextEditorField";
import toast from "react-hot-toast";
import { fetchCategoriesAll } from "@/lib/api/categoryApi";
import { handleChange } from "@/lib/utils/formHandler";
import SelectField from "@/components/form/selectField";
import InputField from "@/components/form/inputField";
import { Plus, Trash2 } from "lucide-react";
import { BASE_IMAGE_URL } from "@/lib/global_constant";
import Image from 'next/image'

interface Category {
    id: number;
    name: string;
}

const ProductEditPage = () => {
    const { slug } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<ProductResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [deletedOldImages, setDeletedOldImages] = useState<number[]>([]);
    const [primaryImage, setPrimaryImage] = useState<{
        type: "old" | "new";
        id?: number;      // image ID dari gambar lama
        index?: number;   // index untuk gambar baru
    } | null>(null);

    const [form, setForm] = useState<UpdateProductRequest>({
        id: 0,
        name: "",
        slug: "",
        catalog_id: "",
        eCatalogURL: "",
        iShowedStatus: "Show",
        category_id: 0,
    });

    const [formDataDesc, setFormDataDesc] = useState<ProductDescRequest>({
        other_info: "",
        productSpec: "",
    });

    const getCategories = async () => {
        try {
            const data: any = await fetchCategoriesAll();
            setCategories(data);
        } catch (err) {
            console.error("Gagal mengambil kategori");
        }
    };

    useEffect(() => {
        if (product && Array.isArray(product.ProductImage)) {
            const found = product.ProductImage.find((img) => img.isPrimary);
            if (found) {
                setPrimaryImage({ type: "old", id: found.id });
            }
        }
    }, [product]);

    useEffect(() => {
        if (typeof slug !== "string") return;
        getCategories();
        getProductBySlug({ slug })
            .then((data) => {
                setProduct(data);
                setForm({
                    id: data.id,
                    name: data.name,
                    slug: data.slug,
                    catalog_id: data.catalog_id || "",
                    eCatalogURL: data.eCatalogURL || "",
                    iShowedStatus: data.iShowedStatus,
                    category_id: data.category_id,
                });
                setFormDataDesc({
                    other_info: data.ProductDesc?.other_info ?? "",
                    productSpec: data.ProductDesc?.productSpec ?? "",
                });
            })
            .catch((err) => setError("error: " + err))
            .finally(() => setLoading(false));
    }, [slug]);

    const handleChangeDesc = (field: string, value: string) => {
        setFormDataDesc((prev) => ({ ...prev, [field]: value }));
    };

    // const handleSubmit = async () => {
    //     if (!product) return;
    //     const productDescID = product.ProductDesc.id;

    //     try {
    //         await updateProduct(form);
    //         await updateProductDesc(productDescID, formDataDesc);

    //         await Promise.all(
    //             deletedOldImages.map((id) => deleteProductImageById(id))
    //         );

    //         if (imageFiles.length > 0) {
    //             await uploadImages(
    //                 form.id,
    //                 imageFiles,
    //                 primaryImage?.type === "new" ? primaryImage.index : null
    //             );
    //         }

    //         toast.success("Produk berhasil diperbarui!");
    //         router.push("/admin/products");
    //     } catch (err) {
    //         toast.error("Gagal memperbarui produk." + err);
    //     }
    // };

    const validateForm = () => {
        if (!form.name.trim()) {
            toast.error("Nama Produk tidak boleh kosong");
            return false;
        }
        if (!form.slug.trim()) {
            toast.error("Slug tidak boleh kosong");
            return false;
        }
        if (!form.catalog_id.trim()) {
            toast.error("Catalog ID tidak boleh kosong");
            return false;
        }
        if (!form.eCatalogURL.trim()) {
            toast.error("e-Catalog URL tidak boleh kosong");
            return false;
        }
        if (!form.category_id || form.category_id === 0) {
            toast.error("Kategori harus dipilih");
            return false;
        }
        if (!form.iShowedStatus.trim()) {
            toast.error("Status Tampil harus dipilih");
            return false;
        }

        // // Optional: validasi deskripsi
        // if (!formDataDesc.productSpec.trim()) {
        //     toast.error("Spesifikasi Produk tidak boleh kosong");
        //     return false;
        // }

        // if (!formDataDesc.other_info.trim()) {
        //     toast.error("Deskripsi Produk tidak boleh kosong");
        //     return false;
        // }

        const remainingOldImages = product!.ProductImage.filter(
            (img) => !deletedOldImages.includes(img.id)
        );
        const totalImagesCount = remainingOldImages.length + imageFiles.length;

        if (totalImagesCount === 0) {
            toast.error("Minimal satu gambar produk harus diunggah");
            return;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!product) return;
        if (!validateForm()) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
        const productDescID = product.ProductDesc.id;

        try {
            await updateProduct(form);
            await updateProductDesc(productDescID, formDataDesc);

            // 1. Hapus gambar lama jika ada
            await Promise.all(
                deletedOldImages.map((id) => deleteProductImageById(id))
            );
            const currentPrimaryId = product.ProductImage.find(img => img.isPrimary)?.id;
            // 2. Jika primary sekarang pindah ke gambar baru, uncheck semua isPrimary lama
            if (product.ProductImage && primaryImage?.type === "new" && currentPrimaryId !== undefined) {
                await Promise.all(
                    product.ProductImage.map((img) =>
                        updateProductImage(img.id, {
                            isPrimary: false,
                            iStatus: "Active",
                            product_id: form.id,
                        })
                    )
                );
            }

            // 3. Jika primary masih di gambar lama DAN berubah, update gambar lama
            if (product.ProductImage && primaryImage?.type === "old" && primaryImage.id !== undefined) {
                await Promise.all(
                    product.ProductImage.map((img) =>
                        updateProductImage(img.id, {
                            isPrimary: img.id === primaryImage.id,
                            iStatus: "Active",
                            product_id: form.id,
                        })
                    )
                );
            }


            // 3. Upload gambar baru
            if (imageFiles.length > 0) {
                await uploadImages(
                    form.id,
                    imageFiles,
                    primaryImage?.type === "new" && primaryImage.index !== undefined
                        ? primaryImage.index
                        : null
                );
            }

            toast.success("Produk berhasil diperbarui!");
            router.push("/admin/products");
        } catch (err) {
            toast.error("Gagal memperbarui produk." + err);
        }
    };


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            const file = files[0];
            const preview = URL.createObjectURL(file);
            setImageFiles((prev) => [...prev, file]);
            setImagePreviews((prev) => [...prev, preview]);
        }
    };

    const handleRemoveImage = (index: number) => {
        const updatedPreviews = [...imagePreviews];
        const updatedFiles = [...imageFiles];
        updatedPreviews.splice(index, 1);
        updatedFiles.splice(index, 1);
        setImagePreviews(updatedPreviews);
        setImageFiles(updatedFiles);
    };

    const handleDeleteOldImage = (index: number) => {
        if (!product || !product.ProductImage) return;
        const img = product.ProductImage[index];
        setDeletedOldImages((prev) => [...prev, img.id]);
        const updatedImages = [...product.ProductImage];
        updatedImages.splice(index, 1);
        setProduct({ ...product, ProductImage: updatedImages });
    };

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (error) return <div className="p-6 text-red-600 text-center">{error}</div>;

    return (
        <div className="min-h-screen px-4 py-10 bg-gray-50">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6 space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Edit Produk</h1>
                    <button
                        onClick={() => router.back()}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        &larr; Kembali
                    </button>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Gambar Produk
                    </label>
                    <div className="flex gap-3 flex-wrap">
                        {/* Gambar Lama */}
                        {product?.ProductImage?.map((img, index) => {
                            const isPrimary =
                                primaryImage?.type === "old" && primaryImage.id === img.id ||
                                (primaryImage?.type === "old" && primaryImage.index === index);
                            return (
                                <div
                                    key={`old-${index}`}
                                    className="relative w-48 h-48 rounded-md overflow-hidden border bg-white group"
                                >
                                    {/* {img.id} */}
                                    <Image
                                        src={BASE_IMAGE_URL + img.imageURL || "/placeholder.png"}
                                        alt={`Image ${index + 1}`}
                                        fill
                                        className="w-full h-full object-contain"
                                    />

                                    {isPrimary && (
                                        <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                                            Primary
                                        </span>
                                    )}
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col gap-2 items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                        <button
                                            onClick={() => setPrimaryImage({ type: "old", id: img.id })}
                                            className="text-xs text-white bg-green-600 hover:bg-green-700 px-2 py-1 rounded"
                                        >
                                            Set as Primary
                                        </button>
                                        <button
                                            onClick={() => handleDeleteOldImage(index)}
                                            className="text-white p-2 rounded-full hover:bg-red-600 bg-red-500"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Gambar Baru */}
                        {imagePreviews.map((img, idx) => {
                            const isPrimary =
                                primaryImage?.type === "new" && primaryImage.index === idx;
                            return (
                                <div
                                    key={`new-${idx}`}
                                    className="relative w-48 h-48 rounded-md overflow-hidden border bg-white group"
                                >
                                    <Image
                                        src={img}
                                        alt={`Uploaded ${idx}`}
                                        fill
                                        className="w-full h-full object-contain"
                                    />
                                    {isPrimary && (
                                        <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                                            Primary
                                        </span>
                                    )}
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                                        <button
                                            onClick={() => handleRemoveImage(idx)}
                                            className="text-white p-2 rounded-full hover:bg-red-600 bg-red-500"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => setPrimaryImage({ type: "new", index: idx })}
                                            className="text-xs text-white bg-green-600 hover:bg-green-700 px-2 py-1 rounded"
                                        >
                                            Set as Primary
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Upload Button */}
                        <label className="w-48 h-48 flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-100">
                            <Plus className="text-gray-500" />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Nama Produk" name="name" type="text" value={form.name} onChange={(e) => handleChange(e, setForm)} />
                    <InputField label="Slug" name="slug" type="text" value={form.slug} onChange={(e) => handleChange(e, setForm)} />
                    <InputField label="Catalog ID" name="catalog_id" type="text" value={form.catalog_id} onChange={(e) => handleChange(e, setForm)} />
                    <InputField label="e-Catalog URL" name="eCatalogURL" type="text" value={form.eCatalogURL} onChange={(e) => handleChange(e, setForm)} />
                    <SelectField label="Status Visibilitas" name="iShowedStatus" value={form.iShowedStatus} onChange={(e) => handleChange(e, setForm)} options={[{ value: "", label: "-- Pilih Status Visilitas --" }, { value: "Show", label: "Tampilkan" }, { value: "Hidden", label: "Sembunyikan" }]} />
                    <SelectField label="Kategori" name="category_id" value={form.category_id} onChange={(e) => handleChange(e, setForm)} options={[{ value: 0, label: "-- Pilih Kategori --" }, ...categories.map((c) => ({ value: c.id, label: c.name }))]} />
                </div>

                <div className="space-y-4">
                    <RichTextEditorField label="Spesifikasi Produk" name="productSpec" content={formDataDesc.productSpec} onChange={handleChangeDesc} />
                    <RichTextEditorField label="Deskripsi Produk" name="other_info" content={formDataDesc.other_info} onChange={handleChangeDesc} />
                </div>

                <div className="pt-4">
                    <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm">
                        Simpan Perubahan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductEditPage;
