'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ProductResponse } from '@/types';
import ProductCard from '../_components/productCard';
import { getAllProducts } from '@/lib/api/productApi';
// import { Products } from './types'; // ganti path sesuai struktur proyekmu

const ProductSection = () => {
    const [products, setProducts] = useState<ProductResponse[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // const res = await fetch('http://localhost:5000/api/product/findall?page=1&limit=6');
                const data = await getAllProducts(1, 6);
                // console.log("res =" + res.text)
                // const data = await res.json();
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
                <h2 className="text-3xl font-bold mb-6 text-customBlue">━ Produk Kami ━</h2>
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
