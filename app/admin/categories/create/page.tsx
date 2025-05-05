"use client";

import { useState } from "react";
import Link from "next/link";
import { useRef } from "react";

const CreateCategoryPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        remarks: "",
        iStatus: "",
        iShowedStatus: "",
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

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
        setFormData((prev) => ({
            ...prev,
            name: "",
            slug: "",
        }));
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const uploadToCloudinary = async (file: File): Promise<string> => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "unsigned_BIP"); // Ganti sesuai config kamu

        // const res = await fetch("https://api.cloudinary.com/v1_1/dsad6wufm/image/upload", {
        //     method: "POST",
        //     body: data,
        // });

        // const json = await res.json();
        const dummy = "https://res.cloudinary.com/dsad6wufm/image/upload/v1745396345/vova5tzyfnqbm0uh4eni.webp"
        // console.log(json)
        // console.log(json.secure_url)
        return dummy;
    };

    // const uploadToCloudinary = async (file: File): Promise<string> => {
    //     const formData = new FormData();
    //     formData.append("file", file);
    //     formData.append("upload_preset", "my_unsigned_preset"); // ← ganti ini
    //     formData.append("cloud_name", "my_cloud_name"); // ← opsional

    //     const res = await fetch("https://api.cloudinary.com/v1_1/my_cloud_name/image/upload", {
    //         method: "POST",
    //         body: formData,
    //     });

    //     const data = await res.json();
    //     return data.secure_url;
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let imageURL = "";

            if (imageFile) {
                imageURL = await uploadToCloudinary(imageFile);
            }

            const payload = {
                ...formData,
                imageURL,
            };
            console.log(imageURL)
            const res = await fetch("http://localhost:5000/api/category/admin/create", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: "e0eb4efb-58d7-48de-b5ce-a324bff7d21f" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Gagal submit");

            alert("Berhasil menyimpan kategori!");
            setFormData({ name: "", slug: "", remarks: "", iStatus: "", iShowedStatus: "" });
            setImageFile(null);
            setImagePreview("");
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
                    <h2 className="text-3xl font-bold text-gray-800">Tambah Kategori</h2>

                    {/* Upload */}
                    <div className="flex flex-col items-center gap-4">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full border border-gray-300 rounded-xl p-2 text-sm"
                        />

                        {imagePreview && (
                            <div className="relative">
                                <img
                                    src={imagePreview}
                                    alt="preview"
                                    className="w-48 h-48 object-cover rounded-xl border shadow"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs hover:bg-red-700"
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Nama dan Slug */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField label="Nama Kategori" name="name" value={formData.name} onChange={handleChange} />
                        <InputField label="Slug" name="slug" value={formData.slug} onChange={handleChange} />
                    </div>

                    {/* Remarks */}
                    <TextAreaField label="Remarks" name="remarks" value={formData.remarks} onChange={handleChange} />

                    {/* Dropdown */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <SelectField
                            label="iStatus"
                            name="iStatus"
                            value={formData.iStatus}
                            onChange={handleChange}
                            options={[
                                { value: "", label: "-- Pilih Status --" },
                                { value: "ACTIVE", label: "Aktif" },
                                { value: "INACTIVE", label: "Nonaktif" },
                            ]}
                        />

                        <SelectField
                            label="iShowedStatus"
                            name="iShowedStatus"
                            value={formData.iShowedStatus}
                            onChange={handleChange}
                            options={[
                                { value: "", label: "-- Tampilkan di Frontend? --" },
                                { value: "SHOW", label: "Tampilkan" },
                                { value: "HIDDEn", label: "Sembunyikan" },
                            ]}
                        />
                    </div>

                    {/* Tombol */}
                    <div className="space-y-3">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg hover:bg-blue-700 transition"
                        >
                            Simpan Kategori
                        </button>

                        <Link
                            href="/admin/categories"
                            className="block text-center w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition"
                        >
                            Kembali ke Daftar Kategori
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Komponen Reusable
function InputField({ label, name, value, onChange }: any) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
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
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
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
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-xl p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {options.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
export default CreateCategoryPage;
//pdSMv8RQpebQSyIgl1vqaXybreE -api secret
//296892138693277 -api key
//