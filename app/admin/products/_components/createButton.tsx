'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const CreateButton = () => {
    const router = useRouter();
    return (
        <button
            type="button"
            onClick={() => router.push("/admin/products/create")}
            className="bg-[#035ea2] hover:bg-[#024b85] text-white font-semibold py-2 px-4 rounded-lg transition"
        >
            Create New Product
        </button>
    );
};

export default CreateButton;
