'use client';

import { routes } from '@/config/routes';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/container';

export default function AboutUsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <Container>
      <div className='grid grid-cols-10 gap-4'>
        <div className='hidden xl:block md:block col-span-2 space-y-2 pb-4'>
          <div className='top-1 mt-2 font-semibold text-xl text-center items-center justify-center text-customBlue mb-2'>
            <h1>ABOUT US</h1>
            <hr className="h-px mx-auto bg-gray-400 border-0 dark:bg-gray-700" />
          </div>
          <ul className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <Link href={routes.directorsays}>
              <li className={`w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 text-customBlue hover:bg-customBlue hover:text-white hover:cursor-pointer ${routes.directorsays === pathname ? 'bg-customBlue text-white' : ''}`}>
                Pesan Direktur
              </li>
            </Link>
            <Link href={routes.aboutcompany}>
              <li className={`w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 text-customBlue hover:bg-customBlue hover:text-white hover:cursor-pointer ${routes.aboutcompany === pathname ? 'bg-customBlue text-white' : ''}`}>
                Tentang Perusahaan
              </li>
            </Link>
            <Link href={routes.visimisi}>
              <li className={`w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 text-customBlue hover:bg-customBlue hover:text-white hover:cursor-pointer ${routes.visimisi === pathname ? 'bg-customBlue text-white' : ''}`}>
                Visi dan Misi
              </li>
            </Link>
            <Link href={routes.certificate}>
              <li className={`w-full px-4 py-2 rounded-b-lg text-customBlue hover:bg-customBlue hover:text-white hover:cursor-pointer ${routes.certificate === pathname ? 'bg-customBlue text-white' : ''}`}>
                Sertifikat
              </li>
            </Link>
          </ul>
        </div>
        {children}
      </div>
    </Container>
  );
}
