import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextProgress from '@/components/ui/next-progress';
// import { siteConfig } from '@/config/site';
import QueryClientProvider from '@/provider/QueryClientProvider';
// import ModalProvider from '@/provider/modal-provider';
import { NavMenu } from '@/app/(company)/_components/navmenu'; //'./_components/navmenu';
import Footer from '@/app/(company)/_components/footer'; // ./_components/footer';

// import { Analytics } from '@vercel/analytics/react';
// import { SpeedInsights } from '@vercel/speed-insights/next';
import HeaderMobile from '@/components/header-mobile';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'bipMED',
    template: '%s - bipmed',
  },
  description: 'Terlengkap dan Terpercaya sejak dua dekade',
  openGraph: {
    title: 'bipmed-Alkes Terlengkap',
    description: 'Terlengkap dan Terpercaya sejak dua dekade',
    type: 'website',
    locale: 'id_ID',
    siteName: 'bipmed',
    // images: [
    //   {
    //     url: 'https://bipmed.vercel.app/images/logo.png',
    //   },
    // ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />

        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='icon' type='image/x-icon' href='/favicon.ico' />
        <link rel='manifest' href='/site.webmanifest' />

        {/* <title>Alkes Terlengkap-bipmed</title> */}
      </head>
      <body className={`${inter.className}`}>
        <NextProgress />
        <QueryClientProvider>
          <NavMenu />
          {/* <ModalProvider /> */} {/*bisa diapus udh gak kepake modalnya */}
          <HeaderMobile />

          {children}
          <div className='py-10'></div>
          <Footer />
        </QueryClientProvider>
        {/* <SpeedInsights /> */}
        {/* <Analytics /> */}

      </body>
    </html>
  );
}
