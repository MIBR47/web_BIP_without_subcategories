"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
// import RichTextEditorField from "../../../../components/form/RichTextEditorField";
import RichTextEditorField from "@/components/form/RichTextEditorField";
import InputField from "@/components/form/inputField";
import SelectField from "@/components/form/selectField";
import { handleChange, handleChangeRichEditor } from "@/lib/utils/formHandler";
import Image from 'next/image'

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const CreateNewsPage = () => {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        article: "",
        iShowedStatus: "Show",
        newsDate: "",
        contentURL: "",
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // const handleChange2 = (
    //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    // ) => {
    //     const { name, value } = e.target;
    //     setFormData((prev) => ({ ...prev, [name]: value }));
    // };

    // const handleChange = (name: string, value: string) => {
    //     setFormData((prev) => ({ ...prev, [name]: value }));
    // };

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

        if (!formData.title.trim() || !formData.slug.trim()) {
            toast.error("Judul dan slug wajib diisi");
            return;
        }

        if (!imageFile) {
            toast.error("Gambar belum dipilih.");
            return;
        }

        setIsLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("file", imageFile);
            formDataToSend.append("title", formData.title);
            formDataToSend.append("slug", formData.slug);
            formDataToSend.append("article", formData.article);
            formDataToSend.append("iShowedStatus", formData.iShowedStatus);
            formDataToSend.append("newsDate", formData.newsDate);
            if (formData.contentURL) {
                formDataToSend.append("contentURL", formData.contentURL);
            }

            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("Token tidak ditemukan");

            const res = await fetch(`${BASE_URL}/news/admin/create`, {
                method: "POST",
                headers: {
                    Authorization: token,
                },
                body: formDataToSend,
            });

            if (!res.ok) {
                let errorMessage = `(${res.status}) ${res.statusText}`;

                try {
                    const errorData = await res.json();
                    if (errorData?.message) {
                        errorMessage += ` - ${errorData.message}`;
                    } else if (errorData?.error) {
                        errorMessage += ` - ${errorData.error}`;
                    }
                    console.error("🧨 JSON error response:", errorData);
                } catch (jsonErr) {
                    const text = await res.text();
                    console.error("🧨 Raw text error response:", text);
                    errorMessage += ` - ${text}`;
                }

                throw new Error(errorMessage);
            }

            toast.success("Berita berhasil disimpan!");
            router.push("/admin/news");
        } catch (err: any) {
            toast.error(err.message || "Gagal menyimpan berita");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <form
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow space-y-6"
            >
                <h1 className="text-3xl font-bold">Tambah Berita</h1>

                {/* Upload */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Image</label>

                    {imagePreview ? (
                        <>
                            <div
                                className="relative w-full max-w-2xl h-72 mx-auto overflow-hidden cursor-pointer hover:opacity-80 transition"
                            // onClick={() => setShowPreview(true)} 
                            >
                                <Image
                                    src={imagePreview}
                                    alt="Uploaded"
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


                <InputField label="Judul Berita" name="title" value={formData.title} onChange={(e) => handleChange(e, setFormData)} />
                <InputField label="Slug" name="slug" value={formData.slug} onChange={(e) => handleChange(e, setFormData)} />
                {/* <TextAreaField label="Isi Artikel" name="article" value={formData.article} onChange={handleChange} /> */}
                <RichTextEditorField label="Isi Artikel" name="article" content={formData.article} onChange={(name, value) => handleChangeRichEditor(name, value, setFormData)} />
                <InputField label="Tanggal Berita" name="newsDate" type="datetime-local" value={formData.newsDate} onChange={(e) => handleChange(e, setFormData)} />
                <InputField label="Link Sumber (opsional)" name="contentURL" value={formData.contentURL} onChange={(e) => handleChange(e, setFormData)} />

                {/* <SelectField
                    label="Showed Status"
                    name="iShowedStatus"
                    value={formData.iShowedStatus}
                    onChange={(e) => handleChange(e, setFormData)}
                    options={[
                        { value: "", label: "-- Pilih --" },
                        { value: "Show", label: "Show" },
                        { value: "Hidden", label: "Hidden" },
                    ]}
                /> */}

                <div className="space-y-3">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
                    >
                        {isLoading ? "Menyimpan..." : "Simpan Berita"}
                    </button>
                    <Link
                        href="/admin/news"
                        className="block text-center w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200"
                    >
                        Kembali ke Daftar Berita
                    </Link>
                </div>
            </form>
        </div>
    );
};
export default CreateNewsPage;
