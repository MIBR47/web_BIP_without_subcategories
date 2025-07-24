// app/company/BillboardClientWrapper.tsx
'use client';

// import BillboardPage from './contentPages/billboardSection';
import { useBillboards } from '@/hooks/use-billboard';
import BillboardPage from '../../../components/home/contentPages/billboardSection';

const BillboardClientWrapper = () => {
    const { data, isLoading, error } = useBillboards();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-100px)]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 py-10">
                Gagal memuat billboard.
            </div>
        );
    }

    if (!data) {
        return (
            <div className="text-center text-gray-500 py-10">
                Data billboard tidak tersedia.
            </div>
        );
    }

    return <BillboardPage data={data} />;
};

export default BillboardClientWrapper;
