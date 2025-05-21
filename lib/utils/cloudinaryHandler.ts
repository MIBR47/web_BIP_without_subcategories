export const uploadToCloudinary = async (file: File): Promise<string> => {
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