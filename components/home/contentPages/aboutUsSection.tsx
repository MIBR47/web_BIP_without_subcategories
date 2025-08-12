'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

const AboutUsSection = () => {
    const imageRef = useRef(null);
    const textRef = useRef(null);
    const isImageInView = useInView(imageRef, { amount: 0.4 });
    const isTextInView = useInView(textRef, { amount: 0.4 });

    const imageControls = useAnimation();
    const textControls = useAnimation();

    useEffect(() => {
        if (isImageInView) {
            imageControls.start({ opacity: 1, x: 0 });
        } else {
            imageControls.start({ opacity: 0, x: -50 });
        }
    }, [isImageInView, imageControls]);

    useEffect(() => {
        if (isTextInView) {
            textControls.start({ opacity: 1, x: 0 });
        } else {
            textControls.start({ opacity: 0, x: 50 });
        }
    }, [isTextInView, textControls]);

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
                {/* Gambar */}
                <motion.div
                    ref={imageRef}
                    initial={{ opacity: 0, x: -50 }}
                    animate={imageControls}
                    transition={{ duration: 0.6 }}
                >
                    <div className="overflow-hidden rounded-xl shadow-xl border border-gray-200">
                        <Image
                            src="/images/about-company.webp"
                            alt="Tentang PT Bumi Indah Putra"
                            width={600}
                            height={400}
                            className="object-cover w-full h-auto"
                        />
                    </div>
                </motion.div>

                {/* Konten Teks */}
                <motion.div
                    ref={textRef}
                    initial={{ opacity: 0, x: 50 }}
                    animate={textControls}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-customBlue mb-4">
                        Tentang Kami
                    </h2>
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed text-justify">
                        <strong>PT. Bumi Indah Putra (BIPMED)</strong> adalah produsen tempat tidur pasien dan furniture rumah sakit. Berdiri sejak tahun 2000 di Bekasi, kami mempekerjakan lebih dari 100 tenaga kerja bersertifikasi.
                        <br /><br />
                        Produk kami telah mengantongi <strong>ISO 9001:2015</strong>, <strong>CPAKB</strong>, dan lulus uji <strong>IEC 60601</strong>. Komitmen kami adalah menghadirkan produk berkualitas tinggi dan aman.
                        <br /><br />
                        Dengan moto <em>&quot;Your Perfect Solution for Hospital Equipment Solutions&quot;</em>, kami hadir untuk memberikan solusi terbaik dan layanan purna jual yang unggul.
                    </p>
                    <div className="mt-6">
                        <Button
                            asChild
                            className="bg-customBlue hover:bg-customGreen hover:text-white text-white text-base px-6 py-3 rounded-md shadow-md"
                        >
                            <Link href="/about-us/about-company">Lihat Detail</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutUsSection;
