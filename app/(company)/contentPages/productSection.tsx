'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import ProductCard from '../_components/productCard';
// import { Products } from './types'; // ganti path sesuai struktur proyekmu

const ProductSection = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/product/findall');
                const data = await res.json();
                setProducts(data.data); // Pastikan respon API bentuknya { data: [...] }
            } catch (error) {
                console.error('Gagal fetch produk:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="pt-10 pb-40 px-6">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Produk bipMED</h2>
                <div className="mt-10 flex justify-center">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-12 max-w-6xl">
                        {Array.isArray(products) &&
                            products.slice(0, 6).map((item) => (
                                <div key={item.id} >
                                    <ProductCard key={item.slug} data={item} />
                                </div>
                            ))}
                    </div>
                </div>

            </div>
        </section>

    );
};

export default ProductSection;
