'use client';
import Link from 'next/link';
import Menu from '@/app/(company)/_components/mobile-menu';
import SearchBar from '@/app/(company)/_components/searchBar';
import Image from 'next/image';
import { routes } from '@/config/routes';
import dynamic from 'next/dynamic';
import { useFilter } from '@/context/filterContext';

const NavIcons = dynamic(() => import('./navIcons'), {
  ssr: false,
});

const Navbar = () => {
  const { setFilterType } = useFilter();

  return (
    <div className='sticky top-0 flex justify-between w-full h-20 px-4 md:px-8 lg:px-4 2xl:px-4 bg-white text-customBlue z-50'>
      {/* MOBILE */}
      <div className='h-full flex items-center justify-between md:hidden'>
        <Link href='/'>
          <div className='text-2xl tracking-wide'>
            <Image
              src='/images/logo/website-logo.png'
              alt='logoatnavbar-small'
              width={150}
              height={150}
              style={{ top: 0, textAlign: 'left' }}
              priority
            />
          </div>
        </Link>
        <Menu />
      </div>
      {/* BIGGER SCREENS */}
      <div className='w-full hidden md:flex items-center justify-between drop-shadow-md gap-8 h-full'>
        {/* LEFT */}
        <div className='flex items-center justify-start'>
          <Link href='/' className='flex items-center'>
            <Image
              src='/images/logo/website-logo.png'
              alt='logoatnavbar'
              width={150}
              height={150}
              priority
            />
          </Link>
        </div>
        {/* CENTER */}
        <div className='hidden xl:flex justify-center gap-4'>
          <Link href='/' onClick={() => setFilterType('all')}>
            Beranda
          </Link>

          <Link href='/'>Tentang Kami</Link>

          <Link
            href={routes.cms.productlist}
            onClick={() => setFilterType('all')}
          >
            Produk
          </Link>
          <Link
            href={routes.cms.ecatalog}
            onClick={() => setFilterType('ecatalog')}
          >
            E-Catalog LKPP
          </Link>
          <Link href={routes.cms.tkdn} onClick={() => setFilterType('tkdn')}>
            Berita
          </Link>
          <Link href='/'>Kontak Kami</Link>
        </div>

        {/* RIGHT */}
        <div className='flex w-1/4 items-center justify-end gap-8 flex-grow'>
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
