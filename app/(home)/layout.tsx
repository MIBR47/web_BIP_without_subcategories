import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextProgress from '@/components/ui/next-progress';
import QueryClientProvider from '@/provider/QueryClientProvider';
import { NavMenu } from '@/app/(home)/_components/navmenu';
import Footer from '@/app/(home)/_components/footer';
import HeaderMobile from '@/components/header-mobile';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'PT. Bumi Indah Putra',
    template: '%s - bipmed',
  },
  description: 'Terlengkap dan Terpercaya sejak dua dekade',
  openGraph: {
    title: 'bipmed-Alkes Terlengkap',
    description: 'Terlengkap dan Terpercaya sejak dua dekade',
    type: 'website',
    locale: 'id_ID',
    siteName: 'bipmed',
  },
};

// app/(company)/layout.tsx

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NextProgress />
      <QueryClientProvider>
        <NavMenu />
        <HeaderMobile />
        <main className="pb-10">{children}</main>
        <Footer />
      </QueryClientProvider>
    </div>
  );
}


