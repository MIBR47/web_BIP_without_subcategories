"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProductResponse, ProductDescRequest, UpdateProductRequest } from '@/types';
import { getProductBySlug, updateProduct, updateProductDesc } from "@/lib/api/productApi";
import RichTextEditorField from "../../../../../components/form/RichTextEditorField";
import toast from "react-hot-toast";
import { fetchCategoriesAll } from "@/lib/api/categoryApi";
import { handleChange } from "@/lib/utils/formHandler";
import SelectField from "@/components/form/selectField";
import InputField from "@/components/form/inputField";

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

    // const handleChange = (field: string, value: string) => {
    //     setForm((prev) => ({ ...prev, [field]: value }));
    // };

    const handleChangeDesc = (field: string, value: string) => {
        setFormDataDesc((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!product) return;
        const productDescID = product.ProductDesc.id;
        try {
            await updateProduct(form);
            await updateProductDesc(productDescID, formDataDesc);
            toast.success("Produk berhasil diperbarui!");
            router.push("/admin/products");
        } catch (err) {
            toast.error("Gagal memperbarui produk.");
        }
    };

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (error) return <div className="p-6 text-red-600 text-center">{error}</div>;

    return (
        <div className="min-h-screen px-4 py-10 bg-gray-50">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6 space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Edit Produk</h1>
                    <button onClick={() => router.back()} className="text-sm text-blue-600 hover:underline">
                        &larr; Kembali
                    </button>
                </div>

                {/* SECTION 2: Gambar Produk */}
                {product?.ProductImage?.length! > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold">Gambar Produk</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                            {product?.ProductImage.map((img, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={img.imageURL || "/placeholder.png"}
                                        alt={`Image ${index + 1}`}
                                        className="w-full h-48 object-contain border rounded"
                                    />
                                    {img.isPrimary && (
                                        <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                                            Primary
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* SECTION 1: Informasi Produk */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        {/* <label className="text-sm font-medium">Nama Produk</label> */}
                        <InputField
                            label="Nama Produk"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={(e) => handleChange(e, setForm)}
                        // className="mt-1 w-full rounded border px-4 py-2"
                        />
                    </div>
                    <div>
                        {/* <label className="text-sm font-medium">Slug</label> */}
                        <InputField
                            label="Slug"
                            name="slug"
                            type="text"
                            value={form.slug}
                            onChange={(e) => handleChange(e, setForm)}
                        // className="mt-1 w-full rounded border px-4 py-2"
                        />
                    </div>
                    <div>
                        {/* <label className="text-sm font-medium">Catalog ID</label> */}
                        <InputField
                            label="Catalog ID"
                            name="catalog_id"
                            type="text"
                            value={form.catalog_id}
                            onChange={(e) => handleChange(e, setForm)}
                        // className="mt-1 w-full rounded border px-4 py-2"
                        />
                    </div>
                    <div>
                        {/* <label className="text-sm font-medium">e-Catalog URL</label> */}
                        <InputField
                            label="e-Catalog URL"
                            name="eCatalogURL"
                            type="text"
                            value={form.eCatalogURL}
                            onChange={(e) => handleChange(e, setForm)}
                        // className="mt-1 w-full rounded border px-4 py-2"
                        />
                    </div>
                    <div>
                        {/* <label className="text-sm font-medium">Status Tampil</label> */}
                        <SelectField
                            label="Status Tampil"
                            name="iShowedStatus"
                            value={form.iShowedStatus}
                            onChange={(e) => handleChange(e, setForm)}
                            // className="mt-1 w-full rounded border px-4 py-2"
                            options={[
                                { value: "", label: "-- Pilih --" },
                                { value: "Show", label: "Show" },
                                { value: "Hidden", label: "Hidden" },
                            ]} />

                    </div>
                    <div>
                        <SelectField
                            label="Kategori"
                            name="category_id"
                            value={form.category_id}
                            onChange={(e) => handleChange(e, setForm)}
                            options={[{ value: 0, label: "-- Pilih Kategori --" }, ...categories.map((c) => ({ value: c.id, label: c.name }))]}
                        />

                    </div>
                </div>



                {/* SECTION 3: Deskripsi */}
                <div className="space-y-4">
                    <RichTextEditorField
                        label="Spesifikasi Produk"
                        name="productSpec"
                        content={formDataDesc.productSpec}
                        onChange={handleChangeDesc}
                    />
                    <RichTextEditorField
                        label="Deskripsi Produk"
                        name="other_info"
                        content={formDataDesc.other_info}
                        onChange={handleChangeDesc}
                    />
                </div>

                {/* BUTTON SIMPAN */}
                <div className="pt-4">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm"
                    >
                        Simpan Perubahan
                    </button>
                </div>
            </div>
        </div >
    );
};

export default ProductEditPage;
