"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { fetchCategoriesAll } from "@/lib/api/categoryApi";
import { UploadCloud } from "lucide-react";

const CreateProductPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        eCatalogURL: "",
        remarks: "",
        iStatus: "ACTIVE",
        iShowedStatus: "SHOW",
        category_id: 0,
    });

    const [categories, setCategories] = useState([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [primaryIndex, setPrimaryIndex] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            const data: any = await fetchCategoriesAll();
            setCategories(data);
        } catch (err) {
            setError('Failed to fetch categories.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const newPreviews = files.map(file => URL.createObjectURL(file));

        setImageFiles(prev => [...prev, ...files]);
        setImagePreviews(prev => [...prev, ...newPreviews]);

        // Set primaryIndex to 0 if it's the first image uploaded
        if (imagePreviews.length === 0) {
            setPrimaryIndex(0); // Automatically set the first image as primary
        }
    };


    const handleRemoveImage = (index: number) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
        if (primaryIndex === index) setPrimaryIndex(null);
        else if (primaryIndex && primaryIndex > index) setPrimaryIndex(primaryIndex - 1);
    };

    const uploadToCloudinary = async (file: File): Promise<string> => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "unsigned_BIP");

        const res = await fetch("https://api.cloudinary.com/v1_1/dsad6wufm/image/upload", {
            method: "POST",
            body: data,
        });
        const json = await res.json();
        return json.secure_url;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/product/admin/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "e0eb4efb-58d7-48de-b5ce-a324bff7d21f",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Gagal submit");
            const created = await res.json();
            const productId = created.data.id;

            for (let i = 0; i < imageFiles.length; i++) {
                const imageURL = await uploadToCloudinary(imageFiles[i]);

                await fetch("http://localhost:5000/api/product/admin/createImageProduct", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "e0eb4efb-58d7-48de-b5ce-a324bff7d21f",
                    },
                    body: JSON.stringify({
                        imageURL,
                        isPrimary: i === primaryIndex,
                        product_id: productId,
                    }),
                });
            }

            alert("Berhasil menyimpan produk!");
            setFormData({ name: "", slug: "", eCatalogURL: "", remarks: "", iStatus: "", iShowedStatus: "", category_id: 0 });
            setImageFiles([]);
            setImagePreviews([]);
            setPrimaryIndex(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (err) {
            console.error(err);
            alert("Terjadi kesalahan saat mengirim data.");
        }
    };

    return (
        <div className="min-h-screen w-full bg-gray-50 flex flex-col">
            <div className="flex-grow flex justify-center items-start py-10 px-4 sm:px-8 lg:px-16">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-4xl bg-white p-8 sm:p-10 rounded-2xl shadow-lg space-y-6"
                >
                    <h2 className="text-3xl font-bold text-gray-800">Tambah Produk</h2>

                    {/* Upload Image Section */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Upload Gambar Produk</label>

                        <div>
                            <input
                                ref={fileInputRef}
                                id="imageUpload"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="hidden"
                                disabled={imagePreviews.length >= 4}  // Disable input if 4 images are already uploaded
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
                                    <div key={i} className="relative">
                                        <img
                                            src={src}
                                            alt={`preview-${i}`}
                                            className={`w-full h-32 object-cover rounded-xl border transition-transform duration-300 transform ${primaryIndex === i ? "ring-4 ring-blue-500 border-blue-500" : "border-gray-300"
                                                }`}
                                        />
                                        {/* Delete Button */}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(i)}
                                            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 text-xs opacity-80 hover:opacity-100 transition-opacity duration-300"
                                        >
                                            ✕
                                        </button>
                                        {/* Primary Button */}
                                        <button
                                            type="button"
                                            onClick={() => setPrimaryIndex(i)}
                                            className={`absolute bottom-2 left-2 text-xs px-2 py-1 rounded bg-white shadow-md ${primaryIndex === i ? "text-blue-600 font-bold" : "text-gray-700"
                                                }`}
                                        >
                                            {primaryIndex === i ? "Primary" : "Jadikan Primary"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {imagePreviews.length >= 4 && (
                            <p className="text-sm text-gray-500 mt-2">Maksimal 4 gambar yang dapat di-upload.</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField label="Nama Produk" name="name" value={formData.name} onChange={handleChange} />
                        <InputField label="Slug" name="slug" value={formData.slug} onChange={handleChange} />
                    </div>

                    <SelectField
                        label="Kategori"
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        options={[{ valueid: "", label: "-- Pilih Kategori --" }, ...categories.map((cat: any) => ({ valueid: cat.id, label: cat.name }))]}
                    />

                    <InputField label="Link e-Catalog" name="eCatalogURL" value={formData.eCatalogURL} onChange={handleChange} />
                    <TextAreaField label="Remarks" name="remarks" value={formData.remarks} onChange={handleChange} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <SelectField
                            label="iStatus"
                            name="iStatus"
                            value={formData.iStatus}
                            onChange={handleChange}
                            options={[{ value: "ACTIVE", label: "Aktif" }, { value: "INACTIVE", label: "Nonaktif" }]}
                        />
                        <SelectField
                            label="iShowedStatus"
                            name="iShowedStatus"
                            value={formData.iShowedStatus}
                            onChange={handleChange}
                            options={[{ value: "SHOW", label: "Tampilkan" }, { value: "HIDDEN", label: "Sembunyikan" }]}
                        />
                    </div>

                    <div className="space-y-3">
                        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg hover:bg-blue-700 transition">
                            Simpan Produk
                        </button>
                        <Link href="/admin/products" className="block text-center w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition">
                            Kembali ke Daftar Produk
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

function InputField({ label, name, value, onChange }: any) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type="text"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}

function TextAreaField({ label, name, value, onChange }: any) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                rows={3}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}

function SelectField({ label, name, value, onChange, options }: any) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-xl p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {options.map((opt: any, index: number) => (
                    <option key={`${opt.valueid}-${index}`} value={opt.valueid}>{opt.label}</option>
                ))}
            </select>
        </div>
    );
}

export default CreateProductPage;
