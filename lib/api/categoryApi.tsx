// lib/api/categoryApi.js

import { Categories } from "@/types";

// Fungsi untuk mengambil semua kategori
export const fetchCategoriesAll = async (): Promise<Categories> => {
    try {
        const res = await fetch('http://localhost:5000/api/category/findall');
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
    try {
        const res = await fetch(`http://localhost:5000/api/category/findbyid/${id}`);
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
