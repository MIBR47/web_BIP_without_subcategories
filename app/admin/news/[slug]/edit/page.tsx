"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { fetchNewsBySlug } from "@/lib/api/newsApi";
import InputField from "@/components/form/inputField";
import RichTextEditorField from "@/components/form/RichTextEditorField";
import { handleChange, handleChangeRichEditor } from "@/lib/utils/formHandler";
import SelectField from "@/components/form/selectField";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL2}`;
const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

const EditBeritaPage = () => {
    const { slug } = useParams();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [formData, setFormData] = useState({
        id: 0,
        title: "",
        slug: "",
        article: "",
        iShowedStatus: "Show",
        newsDate: "",
        contentURL: "",
        imageURL: "", // nilai aslinya dari server
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<{ type: "local" | "url"; src: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (typeof slug !== "string") return;

        fetchNewsBySlug(slug)
            .then((res) => {
                setFormData({
                    id: res.id,
                    title: res.title,
                    slug: res.slug,
                    article: res.article || "",
                    newsDate: new Date(res.newsDate).toISOString().slice(0, 16),
                    contentURL: res.contentURL || "",
                    iShowedStatus: res.iShowedStatus || "Show",
                    imageURL: res.imageURL || "",
                });

                if (res.imageURL) {
                    setImagePreview({
                        type: "url",
                        src: res.imageURL,
                    });
                }
            })
            .catch((err) => {
                console.error(err);
                setError("Gagal mengambil data berita");
            })
            .finally(() => setLoading(false));
    }, [slug]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview({
                type: "local",
                src: URL.createObjectURL(file),
            });
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.slug.trim()) {
            toast.error("Judul dan slug wajib diisi");
            return;
        }

        if (!formData.id) {
            toast.error("ID berita tidak tersedia.");
            return;
        }

        setIsLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("id", String(formData.id));
            formDataToSend.append("title", formData.title);
            formDataToSend.append("slug", formData.slug);
            formDataToSend.append("article", formData.article);
            formDataToSend.append("iShowedStatus", formData.iShowedStatus);
            formDataToSend.append("newsDate", formData.newsDate);
            if (formData.contentURL) {
                formDataToSend.append("contentURL", formData.contentURL);
            }

            // Jika tidak upload file baru, kirim imageURL lama
            if (!imageFile && formData.imageURL) {
                formDataToSend.append("imageURL", formData.imageURL);
            }

            if (imageFile) {
                formDataToSend.append("file", imageFile);
            }

            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("Token tidak ditemukan");

            const res = await fetch(`${BASE_URL}/news/admin/update`, {
                method: "PATCH",
                headers: {
                    Authorization: token,
                },
                body: formDataToSend,
            });

            if (!res.ok) throw new Error("Gagal memperbarui berita");

            toast.success("Berita berhasil diperbarui!");
            router.push("/admin/news");
        } catch (err: any) {
            toast.error(err.message || "Gagal menyimpan berita");
        } finally {
            setIsLoading(false);
        }
    };

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (error) return <div className="p-6 text-red-600 text-center">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <form
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow space-y-6"
            >
                <h1 className="text-3xl font-bold">Edit Berita</h1>

                {/* Upload Image - sama dengan Create Page */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Image</label>

                    {imagePreview ? (
                        <>
                            <div
                                className="relative w-full max-w-2xl h-72 mx-auto overflow-hidden cursor-pointer hover:opacity-80 transition"
                            // onClick={() => setShowPreview(true)}
                            >
                                <img
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
                    label="Judul Berita"
                    name="title"
                    value={formData.title}
                    onChange={(e) => handleChange(e, setFormData)}
                />
                <InputField
                    label="Slug"
                    name="slug"
                    value={formData.slug}
                    onChange={(e) => handleChange(e, setFormData)}
                />
                <RichTextEditorField
                    label="Isi Artikel"
                    name="article"
                    content={formData.article}
                    onChange={(name, value) => handleChangeRichEditor(name, value, setFormData)}
                />
                <InputField
                    label="Tanggal Berita"
                    name="newsDate"
                    type="datetime-local"
                    value={formData.newsDate}
                    onChange={(e) => handleChange(e, setFormData)}
                />
                <InputField
                    label="Link Sumber (opsional)"
                    name="contentURL"
                    value={formData.contentURL}
                    onChange={(e) => handleChange(e, setFormData)}
                />
                <SelectField
                    label="Status Visibilitas"
                    name="iShowedStatus"
                    value={formData.iShowedStatus}
                    onChange={(e) => handleChange(e, setFormData)}
                    options=
                    {[{ value: "", label: "-- Pilih Status Visibilitas --" },
                    { value: "Show", label: "Tampilkan" },
                    { value: "Hidden", label: "Sembunyikan" },]}
                />

                <div className="space-y-3">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
                    >
                        {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
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

export default EditBeritaPage;
