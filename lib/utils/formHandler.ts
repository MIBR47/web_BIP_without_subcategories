export const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    setFormData: React.Dispatch<React.SetStateAction<any>>
) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
        ...prev,
        [name]: name === 'category_id' ? parseInt(value, 10) : value, // Convert category_id to number
    }));
};

export const handleChangeRichEditor = (
    name: string,
    value: string,
    setFormData: React.Dispatch<React.SetStateAction<any>>
) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
};
