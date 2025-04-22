'use client';
import React, { useState } from 'react';
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from '@/components/ui/navbar-menu';
import Link from 'next/link';
import useMediaQuery from '@/hooks/use-media-query';
import MobileMenu from './mobile-menu';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import SearchBar from '@/app/(company)/_components/searchBar';
import dynamic from 'next/dynamic';
import { useCategories } from '@/hooks/useCategories';

import './navbar.css';
const NavIcons = dynamic(() => import('./navIcons'), {
  ssr: false,
});

export function StyledNavbar() {
  return (
    <div className='navbar'>
      <Navbar />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { data: categoryList } = useCategories();

  return (
    <div
      className={cn(
        'sticky top-0 flex text-customBlue justify-between w-full h-20 px-4 md:px-8 lg:px-4 2xl:px-4 bg-white  z-50',
        className
      )}
    >
      <div className='h-full flex items-center justify-between md:hidden'>
        <Link href='/'>
          <div className='text-2xl tracking-wide'>
            <Image
              src='/images/logo/website-logo.png'
              alt='logoatnavbar-small'
              width={150}
              height={150}
              style={{
                width: isMobile ? '100%' : '150px',
                height: isMobile ? 'auto' : '150px',
              }}
              priority
            />
          </div>
        </Link>
        <MobileMenu />
      </div>
      <div className='w-full hidden md:flex items-center justify-between gap-8 h-full'>
        <div className='flex items-center justify-start'>
          <Link href='/'>
            <Image
              src='/images/logo/website-logo.png'
              alt='logoatnavbar'
              width={120}
              height={120}
              priority
            />
          </Link>
        </div>

        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={null} item='Beranda'>
            <div className='flex flex-col space-y-2 text-sm text-customBlue'>
              <HoveredLink href='/'>Beranda</HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item='Tentang Kami'>
            <div className='flex flex-col space-y-2 text-sm'>
              <HoveredLink href='/interface-design'>
                Pesan dari Direktur
              </HoveredLink>
              <HoveredLink href='/web-dev'>Tentang Perusahaan</HoveredLink>
              <HoveredLink href='/web-dev'>Visi dan Misi</HoveredLink>
              <HoveredLink href='/web-dev'>Tentang Pabrik</HoveredLink>
              <HoveredLink href='/web-dev'>Sertifikasi Perusahaan</HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item='Produk'>
            <div className=' text-sm grid text-customBlue grid-cols-4 gap-10 p-12'>
              {categoryList?.map((item, index) => (
                <ProductItem
                  key={index}
                  title={item.name}
                  href={routes.cms.categoryId(item.id)}
                  src={item.href ? item.href : 'public/images/logo/logo.svg'} // Use a placeholder image if href is empty
                  description=''
                />
              ))}
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={null} item='e-katalog.lkpp'>
            <div className='flex flex-col space-y-2 text-sm text-customBlue'>
              <HoveredLink href={routes.cms.pricelist}>
                e-katalog.lkpp
              </HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={null} item='Berita'>
            <div className='flex flex-col space-y-2 text-sm text-customBlue'>
              <HoveredLink href={routes.cms.productlist}>Berita</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item='Kontak Kami'>
            <div className='flex flex-col space-y-2 text-sm text-customBlue'>
              <HoveredLink href={routes.cms.categoryList}>
                Category List
              </HoveredLink>
            </div>
          </MenuItem>
        </Menu>
        <div className='flex w-1/4 items-center justify-end gap-8 flex-grow'>
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
}
