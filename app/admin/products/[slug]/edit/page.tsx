"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProductResponse, ProductDescRequest, UpdateProductRequest } from '@/types';
import { getProductBySlug, updateProduct, updateProductDesc } from "@/lib/api/productApi";
// import SimpleEditor from "@/components/SimpleEditor"; // assuming you're using it
import RichTextEditorField from "../../_components/RichTextEditorField";
import toast from "react-hot-toast";

const ProductEditPage = () => {
    const { slug } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<ProductResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState<UpdateProductRequest>({
        id: 0,
        name: "",
        slug: "",
        catalog_id: "",
        eCatalogURL: "",
        iStatus: "Active",
        iShowedStatus: "Show",
        category_id: 0,
        // productSpec: "",
        // other_info: "",
    });

    const [formDataDesc, setFormDataDesc] = useState<ProductDescRequest>({
        // id: 0,
        other_info: "",
        productSpec: "",
        // benefits: "",
    });


    useEffect(() => {
        if (typeof slug !== "string") return;
        getProductBySlug({ slug })
            .then((data) => {
                setProduct(data);
                setForm({
                    id: data.id,
                    name: data.name,
                    slug: data.slug,
                    catalog_id: data.catalog_id || "",
                    eCatalogURL: data.eCatalogURL || "",
                    iStatus: data.iStatus,
                    iShowedStatus: data.iShowedStatus,
                    category_id: data.category_id
                });
                setFormDataDesc({
                    // id: data.ProductDesc?.id ?? "",
                    other_info: data.ProductDesc?.other_info ?? "",
                    productSpec: data.ProductDesc?.productSpec ?? ""
                });
            })
            .catch((erorr) => setError("error: " + erorr))
            .finally(() => setLoading(false));
    }, [slug]);

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };
    const handleChangeDesc = (name: string, value: string) => {
        setFormDataDesc((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!product) return;

        const productDescID = product.ProductDesc.id;
        // console.log(formDataDesc.other_info + formDataDesc.productSpec)

        try {
            await updateProduct(form);
            await updateProductDesc(productDescID, formDataDesc);
            toast.success("Product information updated successfully!");
            router.push("/admin/products");
        } catch (err) {
            toast.error("Failed to update product info.");
        }

        // try {

        //     toast.success("Product description updated successfully!");
        // } catch (err) {
        //     toast.error("Failed to update product description.");
        // }
    };


    if (loading) return <div className="p-6 text-center text-gray-500">Loading...</div>;
    if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

    return (
        <div className="min-h-screen w-full bg-gray-50 flex justify-center items-start py-10 px-4">
            <div className="w-full max-w-5xl bg-white p-8 sm:p-10 rounded-2xl shadow-lg space-y-6">
                <button onClick={() => router.back()} className="text-blue-600 hover:underline">
                    &larr; Back
                </button>

                <h1 className="text-3xl font-bold text-gray-800">Edit Product</h1>

                {/* Product Images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product?.ProductImage.map((img, i) => (
                        <div key={i} className="relative">
                            <img
                                src={img.imageURL || "/placeholder.png"}
                                alt={`Product ${i + 1}`}
                                className="w-full h-64 object-contain border rounded-lg"
                            />
                            {img.isPrimary && (
                                <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                                    Primary
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            className="mt-1 w-full rounded border px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Slug</label>
                        <input
                            type="text"
                            value={form.slug}
                            onChange={(e) => handleChange("slug", e.target.value)}
                            className="mt-1 w-full rounded border px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Catalog ID</label>
                        <input
                            type="text"
                            value={form.catalog_id}
                            onChange={(e) => handleChange("catalog_id", e.target.value)}
                            className="mt-1 w-full rounded border px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">e-Catalog URL</label>
                        <input
                            type="text"
                            value={form.eCatalogURL}
                            onChange={(e) => handleChange("eCatalogURL", e.target.value)}
                            className="mt-1 w-full rounded border px-4 py-2"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Status</label>
                            <select
                                value={form.iStatus}
                                onChange={(e) => handleChange("iStatus", e.target.value)}
                                className="mt-1 w-full rounded border px-4 py-2"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Showed Status</label>
                            <select
                                value={form.iShowedStatus}
                                onChange={(e) => handleChange("iShowedStatus", e.target.value)}
                                className="mt-1 w-full rounded border px-4 py-2"
                            >
                                <option value="Show">Show</option>
                                <option value="Hide">Hide</option>
                            </select>
                        </div>
                    </div>

                    {/* Product Specification */}
                    {/* <div>
                        <label className="block text-sm font-medium">Product Specification</label>
                        <SimpleEditor
                            value={form.productSpec}
                            onChange={(value: string) => handleChange("productSpec", value)}
                        />
                    </div> */}

                    {/* Other Info */}
                    {/* <div>
                        <label className="block text-sm font-medium">Other Info</label>
                        <SimpleEditor
                            value={form.other_info}
                            onChange={(value: string) => handleChange("other_info", value)}
                        />
                    </div> */}
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

                    <div className="pt-6">
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm"
                        >
                            Update Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductEditPage;
