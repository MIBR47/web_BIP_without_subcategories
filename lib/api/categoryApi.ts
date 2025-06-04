// lib/api/categoryApi.js

import { Categories } from "@/types";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL2}`;
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL2;
const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return {
        "Content-Type": "application/json",
        Authorization: token || "",
    };
};

export const updateCategory = async (category: Categories): Promise<Categories> => {
    const res = await fetch(`${BASE_URL}/category/admin/update`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({
            ...category,
        }),
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error('Failed to update category:', errorText);
        throw new Error('Update failed');
    }

    const data = await res.json();
    return data.data; // Sesuai response API-mu
};

export const deleteCategoryById = async (id: number) => {
    const res = await fetch(`${BASE_URL}/category/admin/delete/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),

    });
    if (!res.ok) throw new Error('Delete failed');
    return await res.json();
};
// Fungsi untuk mengambil semua kategori
export const fetchCategoriesAll = async (): Promise<Categories[]> => {
    let url = `${BASE_URL}/category/findall`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Failed to fetch categories');
        }
        const categories = await res.json();
        return categories.data; // Mengembalikan data kategori
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Fungsi untuk mengambil kategori berdasarkan ID
export const fetchCategoryById = async (id: number): Promise<Categories> => {
    let url = `${BASE_URL}/category/findbyid/${id}`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Failed to fetch category');
        }
        const category = await res.json();
        return category.data; // Mengembalikan data kategori berdasarkan ID
    } catch (error) {
        console.error(`Error fetching category with ID ${id}:`, error);
        throw error;
    }
};


interface Query {
    slug?: string;
}

export const fetchCategoryBySlug = async (query: Query): Promise<Categories> => {
    let url = `${BASE_URL}/category/findbyslug/${query.slug}`;

    console.log('Fetching category with URL:', url);

    try {
        const res = await fetch(url);

        if (!res.ok) {
            console.error(`Error fetching category: ${res.statusText}`);
            throw new Error(`Error fetching category: ${res.statusText}`);
        }

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.error('Response is not JSON:', await res.text());
            throw new Error('Response is not JSON');
        }
        const category = await res.json();

        return category.data;
    } catch (error) {
        console.error('Failed to fetch category:', error);
        throw error;
    }
};