// app/(public)/berita/page.tsx
import React from "react";
import BeritaCard from "./_components/beritaCard";
import LayoutLoader from "@/components/ui/layout-loader";
import Loading from "../loading";

export const revalidate = 60;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type NewsResponse = {
    title: string;
    slug: string;
    article?: string | null;
    imageURL?: string | null;
    newsDate?: string | null;
};

async function fetchBerita(): Promise<NewsResponse[]> {
    try {
        const res = await fetch(`${BASE_URL}/news/findall?page=1&limit=20`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            console.error("fetchBerita: API returned not ok", res.status);
            return [];
        }

        const json = await res.json();
        const list = Array.isArray(json) ? json : json?.data;
        if (!Array.isArray(list)) return [];

        return list.map((it: any) => ({
            title: it?.title ?? "",
            slug: it?.slug ?? "",
            article: it?.article ?? null,
            imageURL: it?.imageURL ?? null,
            newsDate: it?.newsDate ?? null,
        }));
    } catch (err) {
        console.error("fetchBerita error:", err);
        return [];
    }
}

function formatDate(dateStr?: string | null): string {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export default async function ListBeritaPage() {
    // Loading state
    const beritaList = await fetchBerita();

    if (!beritaList) {
        return <div className="py-12 text-center"> <Loading /> </div>
    } if (beritaList.length === 0) {
        return <section className="py-12 text-center">Belum ada berita.</section>;

    }

    const sortedList = beritaList
        .sort((a, b) => {
            const dateA = new Date(a.newsDate || "").getTime();
            const dateB = new Date(b.newsDate || "").getTime();
            return dateB - dateA;
        }); // Hanya ambil 3 berita

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-xl font-bold text-blue-800 mb-6">BERITA</h1>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {sortedList.map((item, idx) => (
                    <BeritaCard
                        key={item.slug || idx}
                        title={item.title}
                        slug={item.slug}
                        date={formatDate(item.newsDate)}
                        excerpt={item.article?.slice(0, 100)}
                        imageURL={item.imageURL || undefined}
                    />
                ))}
            </div>
        </div>
    );
}
