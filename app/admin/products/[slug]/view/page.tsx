"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ProductResponse } from "@/types";
import { getProductBySlug } from "@/lib/api/productApi";

const ProductViewPage = () => {
    const router = useRouter();
    const params = useParams();
    const slug = typeof params.slug === "string" ? params.slug : Array.isArray(params.slug) ? params.slug[0] : "";

    const [product, setProduct] = useState<ProductResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;

        getProductBySlug({ slug })
            .then((data) => setProduct(data))
            .catch(() => setError("Gagal memuat data produk"))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) return <div className="p-6 text-center text-gray-500">Loading...</div>;
    if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

    return (
        <div className="min-h-screen w-full bg-gray-50 flex justify-center items-start py-10 px-4">
            <div className="w-full max-w-5xl bg-white p-8 sm:p-10 rounded-2xl shadow-lg space-y-6">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={() => router.back()}
                        className="text-blue-600 hover:underline"
                    >
                        &larr; Back
                    </button>
                    {product && (
                        <button
                            onClick={() => router.push(`/admin/products/${product.slug}/edit`)}
                            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                        >
                            Edit Product
                        </button>
                    )}
                </div>

                <h1 className="text-2xl font-bold text-gray-800 mb-6">Product Information</h1>


                {product && (
                    <div className="space-y-6">

                        {/* Product Images */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {product.ProductImage.map((img, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={img.imageURL || "/placeholder.png"}
                                            alt={`Image ${index + 1}`}
                                            className="w-full h-48 object-contain border rounded-md bg-white"
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

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={product.name}
                                readOnly
                                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
                            />
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Slug</label>
                            <input
                                type="text"
                                value={product.slug}
                                readOnly
                                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
                            />
                        </div>

                        {/* Catalog ID & e-Catalog URL */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Catalog ID</label>
                                <input
                                    type="text"
                                    value={product.catalog_id}
                                    readOnly
                                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">e-Catalog URL</label>
                                <input
                                    type="text"
                                    value={product.eCatalogURL}
                                    readOnly
                                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
                                />
                            </div>
                        </div>

                        {/* Statuses */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <input
                                    type="text"
                                    value={product.iStatus}
                                    readOnly
                                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Showed Status</label>
                                <input
                                    type="text"
                                    value={product.iShowedStatus}
                                    readOnly
                                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
                                />
                            </div>
                        </div>

                        {/* Description Fields */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Product Specification</label>
                            <textarea
                                value={product.ProductDesc?.productSpec || "-"}
                                readOnly
                                rows={4}
                                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Other Info</label>
                            <textarea
                                value={product.ProductDesc?.other_info || "-"}
                                readOnly
                                rows={4}
                                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductViewPage;
