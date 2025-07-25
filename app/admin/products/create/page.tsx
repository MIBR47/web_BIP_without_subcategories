"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { UploadCloud } from "lucide-react";
import { fetchCategoriesAll } from "@/lib/api/categoryApi";
import { uploadToCloudinary } from "@/lib/utils/cloudinaryHandler";
import { handleImageChange, handleRemoveImage } from "@/lib/utils/imageHandler";
import { handleChange } from "@/lib/utils/formHandler";
import { ProductDescRequest } from "@/types";
import 'react-quill/dist/quill.snow.css';
import RichTextEditorField from "../../../../components/form/RichTextEditorField";
import { useRouter } from "next/navigation";
import { createProduct, uploadDescriptions, uploadImages } from "@/lib/api/productApi";
import { toast } from "react-hot-toast";
import SelectField from "@/components/form/selectField";
import InputField from "@/components/form/inputField";
// import InputField from "@/components/form/inputfield";



export interface ProductForm {
    name: string;
    slug: string;
    eCatalogURL: string;
    // remarks: string;
    // iStatus: "Active" | "InActive";
    iShowedStatus: "Show" | "Hidden";
    category_id: number;
    catalog_id: string,
}

interface Category {
    id: number;
    name: string;
}
// const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;


const CreateProductPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<ProductForm>({
        catalog_id: "",
        name: "",
        slug: "",
        eCatalogURL: "",
        // remarks: "test",
        // iStatus: "Active",
        iShowedStatus: "Show",
        category_id: 0,
    });

    const [formDataDesc, setFormDataDesc] = useState<ProductDescRequest>({
        // id: 0,
        other_info: "",
        productSpec: "",
        // benefits: "",
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
    // const getCategories = async () => {
    //     try {
    //       const data: any = await fetchCategoriesAll();
    //       setCategories(data);
    //     } catch (err) {
    //       setError('Failed to fetch categories.');
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
    useEffect(() => {

        getCategories();
    }, []);

    // const handleChangeDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     const { name, value } = e.target;
    //     setFormDataDesc((prev) => ({ ...prev, [name]: value }));
    // };

    const handleChangeDesc = (name: string, value: string) => {
        setFormDataDesc((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, '').trim();

        if (!formData.name.trim()) return toast.error("Nama produk tidak boleh kosong.");
        if (!formData.slug.trim()) return toast.error("Slug tidak boleh kosong.");
        if (!formData.catalog_id.trim()) return toast.error("Catalog ID tidak boleh kosong.");
        if (!formData.eCatalogURL.trim()) return toast.error("Link e-Catalog tidak boleh kosong.");
        if (!formData.category_id || formData.category_id === 0) return toast.error("Kategori harus dipilih.");

        if (!stripHtml(formDataDesc.other_info)) return toast.error("Deskripsi produk tidak boleh kosong.");
        if (!stripHtml(formDataDesc.productSpec)) return toast.error("Spesifikasi produk tidak boleh kosong.");

        // if (!formDataDesc.other_info.trim()) return toast.error("Deskripsi produk tidak boleh kosong.");
        // if (!formDataDesc.productSpec.trim()) return toast.error("Spesifikasi produk tidak boleh kosong.");
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
            <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow space-y-6">
                <h2 className="text-3xl font-bold text-gray-800">Tambah Produk</h2>

                {/* Upload Gambar */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Upload Gambar</label>
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
                                <div key={i} className="relative">
                                    <img
                                        src={src}
                                        className={`w-full h-32 object-cover rounded-xl border ${primaryIndex === i ? "ring-4 ring-blue-500" : "border-gray-300"}`}
                                    />
                                    <button
                                        onClick={() => handleRemoveImage(i, setImageFiles, setImagePreviews, primaryIndex, setPrimaryIndex)}
                                        type="button"
                                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-xs"
                                    >
                                        ✕
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPrimaryIndex(i)}
                                        className={`absolute bottom-1 left-1 text-xs px-2 py-1 rounded bg-white shadow ${primaryIndex === i ? "text-blue-600 font-bold" : "text-gray-700"}`}
                                    >
                                        {primaryIndex === i ? "Primary" : "Set Primary"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    {imagePreviews.length >= 4 && (
                        <p className="text-sm text-gray-500">Maksimal 4 gambar</p>
                    )}
                </div>

                {/* Input Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Nama Produk" name="name" value={formData.name} onChange={(e) => handleChange(e, setFormData)} />
                    <InputField label="Slug" name="slug" value={formData.slug} onChange={(e) => handleChange(e, setFormData)} />
                </div>
                <InputField label="Catalog ID" name="catalog_id" value={formData.catalog_id} onChange={(e) => handleChange(e, setFormData)} />
                <SelectField
                    label="Kategori"
                    name="category_id"
                    value={formData.category_id}
                    onChange={(e) => handleChange(e, setFormData)}
                    options={[{ value: 0, label: "-- Pilih Kategori --" }, ...categories.map((c) => ({ value: c.id, label: c.name }))]}
                />

                <InputField label="Link e-Catalog" name="eCatalogURL" value={formData.eCatalogURL} onChange={(e) => handleChange(e, setFormData)} />

                {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SelectField
                        label="iStatus"
                        name="iStatus"
                        value={formData.iStatus}
                        onChange={(e) => handleChange(e, setFormData)}
                        options={[{ value: "ACTIVE", label: "Aktif" }, { value: "INACTIVE", label: "Nonaktif" }]}
                    />
                    <SelectField
                        label="iShowedStatus"
                        name="iShowedStatus"
                        value={formData.iShowedStatus}
                        onChange={(e) => handleChange(e, setFormData)}
                        options={[{ value: "SHOW", label: "Tampilkan" }, { value: "HIDDEN", label: "Sembunyikan" }]}
                    />
                </div> */}

                {/* Deskripsi Produk */}
                <RichTextEditorField label="Deskripsi Produk" name="other_info" content={formDataDesc.other_info} onChange={handleChangeDesc} />
                <RichTextEditorField label="Spesifikasi Produk" name="productSpec" content={formDataDesc.productSpec} onChange={handleChangeDesc} />
                {/* <RichTextEditorField label="Manfaat Produk" name="benefits" content={formDataDesc.benefits} onChange={handleChangeDesc} /> */}


                <div className="space-y-3">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 rounded-xl text-lg ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                    >
                        {isLoading ? "Menyimpan..." : "Simpan Produk"}
                    </button>
                    <Link href="/admin/products" className="block text-center w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200">
                        Kembali ke Daftar Produk
                    </Link>
                </div>
            </form>
        </div>
    );
};

// interface InputFieldProps {
//     label: string;
//     name: string;
//     value: string | number;
//     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const InputField = ({ label, name, value, onChange }: InputFieldProps) => (
//     <div>
//         <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//         <input
//             type="text"
//             name={name}
//             value={value}
//             onChange={onChange}
//             className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//     </div>
// );

// interface TextAreaFieldProps {
//     label: string;
//     name: string;
//     value: string;
//     onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
// }

// const TextAreaField = ({ label, name, value, onChange }: TextAreaFieldProps) => (
//     <div>
//         <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//         <textarea
//             name={name}
//             value={value}
//             onChange={onChange}
//             rows={3}
//             className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//     </div>
// );

// interface SelectOption {
//     value: number;
//     label: string;
// }

// interface SelectFieldProps {
//     label: string;
//     name: string;
//     value: number;
//     onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
//     options: SelectOption[];
// }

// const SelectField = ({ label, name, value, onChange, options }: SelectFieldProps) => (
//     <div>
//         <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//         <select
//             name={name}
//             value={value}
//             onChange={onChange}
//             className="w-full border border-gray-300 rounded-xl p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//             {options.map((opt, index) => (
//                 <option key={index} value={opt.value}>{opt.label}</option>
//             ))}
//         </select>
//     </div>
// );

export default CreateProductPage;
