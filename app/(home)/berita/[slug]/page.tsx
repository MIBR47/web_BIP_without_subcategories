// app/news/[slug]/page.tsx
'use client';

import { Metadata } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from '../loading';
import { BASE_IMAGE_URL } from '@/lib/global_constant';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface News {
    title: string;
    slug: string;
    article: string;
    imageURL: string;
    iShowedStatus: string;
    newsDate: string;
    contentURL?: string;
}

export default function BeritaPage({ params }: { params: { slug: string } }) {
    const router = useRouter();
    const [news, setNews] = useState<News | null>(null);

    useEffect(() => {
        async function fetchNews() {
            try {
                const res = await fetch(`${BASE_URL}/news/findbyslug/${params.slug}`, {
                    cache: 'no-store',
                });
                if (!res.ok) throw new Error('Failed to fetch');

                const data = await res.json();
                setNews(data.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchNews();
    }, [params.slug]);

    if (!news) {
        return <div className="py-12 text-center"> <Loading /> </div>
    }

    return (
        <div className="max-w-4xl mx-auto py-6 space-y-6">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="text-sm text-gray-600 hover:text-black transition underline mb-4"
            >
                ← Kembali
            </button>

            {/* Title */}
            <h1 className="text-3xl font-bold text-[#035ea2]">{news.title}</h1>

            {/* Date */}
            <p className="text-green-600 text-sm">
                {new Date(news.newsDate).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}{' '}
                {new Date(news.newsDate).toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </p>

            {/* Image */}
            {news.imageURL && (
                <div className="relative rounded overflow-hidden shadow">
                    <Image
                        src={BASE_IMAGE_URL + news.imageURL}
                        alt={news.title}
                        // fill
                        // style={{ objectFit: 'contain' }}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                        className="object-cover"
                    />
                </div>
            )}

            {/* Article */}
            {news.article ? (
                <article
                    className="prose max-w-none prose-blue"
                    dangerouslySetInnerHTML={{ __html: news.article }}
                />
            ) : (
                <p className="text-gray-500">Konten belum tersedia.</p>
            )}

            {/* Content URL */}
            {news.contentURL && (
                <div className="pt-6">
                    <p className="text-sm text-gray-600">
                        Sumber berita:{' '}
                        <a
                            href={news.contentURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800"
                        >
                            {news.contentURL}
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
}
