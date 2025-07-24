// components/BeritaCard.tsx
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    title: string;
    slug: string;
    date: string;
    excerpt?: string;
    imageURL?: string | null;
};

export default function BeritaCard({ title, slug, date, excerpt, imageURL }: Props) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <Link href={`/berita/${slug}`}>
                <div className="w-full h-48 relative">
                    {imageURL ? (
                        <Image src={imageURL} alt={title} fill className="object-contain" />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                            No Image
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <p className="text-green-600 text-sm mb-1">{date}</p>
                    <h2 className="text-md font-semibold text-blue-800 mb-2">{title}</h2>
                    <p className="text-sm text-gray-600 line-clamp-2">{excerpt || ''}</p>
                </div>
            </Link>
        </div>
    );
}
