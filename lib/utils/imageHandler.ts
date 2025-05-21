export const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImageFiles: React.Dispatch<React.SetStateAction<File[]>>,
    setImagePreviews: React.Dispatch<React.SetStateAction<string[]>>,
    setPrimaryIndex: React.Dispatch<React.SetStateAction<number | null>>,
    currentPreviewsLength: number
) => {
    const files = Array.from(e.target.files || []);
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setImageFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);

    if (currentPreviewsLength === 0) {
        setPrimaryIndex(0);
    }
};



export const handleRemoveImage = (
    index: number,
    setImageFiles: React.Dispatch<React.SetStateAction<File[]>>,
    setImagePreviews: React.Dispatch<React.SetStateAction<string[]>>,
    primaryIndex: number | null,
    setPrimaryIndex: React.Dispatch<React.SetStateAction<number | null>>
) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));

    if (primaryIndex === index) {
        setPrimaryIndex(null);
    } else if (primaryIndex !== null && primaryIndex > index) {
        setPrimaryIndex(primaryIndex - 1);
    }
};



