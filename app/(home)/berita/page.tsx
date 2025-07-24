// app/(public)/berita/page.tsx

import BeritaCard from "./_components/beritaCard";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL2;

type NewsResponse = {
    title: string;
    slug: string;
    article?: string | null;
    imageURL?: string | null;
    newsDate?: string | null;
};

async function fetchBerita(): Promise<NewsResponse[]> {
    const res = await fetch(`${BASE_URL}/news/findall?page=1&limit=20`, {
        cache: 'no-store',
    });
    const data = await res.json();
    return data.data;
}

function formatDate(dateStr?: string | null): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}

export default async function ListBeritaPage() {
    let beritaList = await fetchBerita();

    // Urutkan berdasarkan newsDate descending (terbaru di atas)
    beritaList = beritaList.sort((a, b) => {
        const dateA = new Date(a.newsDate || '').getTime();
        const dateB = new Date(b.newsDate || '').getTime();
        return dateB - dateA;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-xl font-bold text-blue-800 mb-6">BERITA</h1>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {beritaList.map((item, idx) => (
                    <BeritaCard
                        key={idx}
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
