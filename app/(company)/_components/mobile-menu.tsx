'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CircleChevronDown, CircleChevronUp } from 'lucide-react';
import { routes } from '@/config/routes';
import { useMediaQuery } from 'react-responsive';
import SearchBar from '@/app/(company)/_components/searchBar';

const MobilMenu = () => {
  const [open, setOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  const handleIconClick = () => {
    setIsExpanded(!isExpanded);
    setOpen((prev) => !prev);
  };

  return (
    <div className='relative'>
      <div className='px-2 pt-3 flex items-center justify-between'>
        <button onClick={handleIconClick}>
          {isExpanded ? <CircleChevronUp /> : <CircleChevronDown />}
        </button>
        <div
          className={`flex ${isMobile ? 'w-full' : 'w-3/4'} items-center justify-end gap-8 flex-grow`}
        >
          <SearchBar />
        </div>
      </div>
      {isExpanded && (
        <div className='px-2 pt-3'>
          {/* Your expandable menu content goes here */}
        </div>
      )}
      {open && (
        <div className='absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-10'>
          <Link href='/'>Beranda</Link>
          <Link href='/'>Tentang Perusahaan</Link>
          <Link href={routes.cms.categoryList}>Produk</Link>
          <Link href={routes.cms.pricelist}>eKatalog</Link>
          <Link href='#'>Berita</Link>
          <Link href='#'>Kontak Kami </Link>
        </div>
      )}
    </div>
  );
};

export default MobilMenu;
