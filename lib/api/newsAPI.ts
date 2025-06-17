// lib/api/categoryApi.js

import { News } from "@/types";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL2}`;
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL2;
const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return {
        "Content-Type": "application/json",
        Authorization: token || "",
    };
};

export const fetchNewsAllAdmin = async (): Promise<News[]> => {
    let url = `${BASE_URL}/news/admin/findall`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Failed to fetch news');
        }
        const news = await res.json();
        return news.data; // Mengembalikan data berita
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
};
export const fetchnewsAll = async (): Promise<News[]> => {
    let url = `${BASE_URL}/news/findall`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Failed to fetch news');
        }
        const news = await res.json();
        return news.data; // Mengembalikan data berita
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
};

export const deleteNewsBySlug = async (slug: string) => {
    const res = await fetch(`${BASE_URL}/category/admin/delete/${slug}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),

    });
    if (!res.ok) throw new Error('Delete failed');
    return await res.json();
};