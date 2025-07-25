'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';

import MarginWidthWrapper from '@/components/margin-width-wrapper';
import PageWrapper from '@/components/page-wrapper';
import SideNav from '@/app/admin/_components/side-nav';
import Header from './_components/header';
import HeaderMobileAdmin from '@/app/admin/_components/header-mobile-admin';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
        if (!res.ok) {
          router.push('/auth/login');
          return;
        }
      } catch (err) {
        console.error('Token check error:', err);
        router.push('/auth/login');
        return;
      }

      setIsChecking(false);
    };

    checkToken();
  }, [router]);

  if (isChecking) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <div className={`bg-white ${inter.className} flex flex-col md:flex-row h-screen`}>
        <SideNav />
        <main className="flex-1 flex flex-col h-full">
          <MarginWidthWrapper className="flex flex-col h-full overflow-hidden">
            <Header />
            <HeaderMobileAdmin />
            <PageWrapper className="flex-1 overflow-y-auto pt-[47px]">
              {children}
            </PageWrapper>
          </MarginWidthWrapper>
        </main>
      </div>
    </>
  );
}
