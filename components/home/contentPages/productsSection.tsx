import Link from 'next/link';

import Image from 'next/image';

import { Button } from '@/components/ui/button';

const CustomProductSection = () => {
  return (
    <section className="-mt-20 bg-customBlue text-white py-4 px-4 md:px-8 rounded-2xl max-w-5xl mx-auto shadow-lg relative overflow-hidden">
      {/* Background image overlay */}
      <div className="absolute inset-0 rounded-2xl bg-[url('/images/test.png')] bg-cover bg-center opacity-10 pointer-events-none z-0" />

      <div className="relative z-10 grid md:grid-cols-3 items-center gap-6">
        {/* Kolom teks (lebih besar) */}
        <div className="md:col-span-2 space-y-2">
          <h1 className="text-xl md:text-2xl font-bold leading-snug">
            Solusi Produk Custom Terbaik
          </h1>

          <p className="text-sm md:text-base font-medium text-white/90">
            Memadukan Kualitas dan Personalisasi dalam Perlengkapan Rumah Sakit
          </p>

          <p className="text-xs md:text-sm text-white/80 leading-snug">
            Kami memahami bahwa setiap rumah sakit memiliki kebutuhan unik. Oleh karena itu, kami menyediakan solusi perlengkapan rumah sakit yang dapat disesuaikan.
          </p>
        </div>

        {/* Kolom tombol */}
        <div className="flex md:justify-end justify-center">
          <Link
            href="https://wa.me/6281255558023"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#0072c6] font-semibold px-5 py-2 rounded-md hover:bg-gray-100 transition duration-300 shadow"
          >
            Hubungi Kami
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CustomProductSection;
