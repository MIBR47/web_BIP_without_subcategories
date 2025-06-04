import { Icon } from '@iconify/react';

import { SideNavItem } from './type';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Beranda',
    path: '/',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: 'Tentang Kami',
    path: '/about-us/director',
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Pesan Direktur', path: '/about-us/director' },
      { title: 'Tentang Perusahaan', path: '/about-us/about-company' },
      { title: 'Visi dan Misi', path: '/about-us/visi-misi' },
      { title: 'Sertifikat', path: '/about-us/certificat' },

    ],
  },
  {
    title: 'Produk',
    path: '/categories/category-list',
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    // submenu: true,
    // subMenuItems: [
    //   { title: 'All', path: '/admin/projects' },
    //   { title: 'Web Design', path: '/admin/projects/web-design' },
    //   { title: 'Graphic Design', path: '/admin/projects/graphic-design' },
    // ],
  },
  {
    title: 'eCatalogue.lkpp',
    path: '/products/eCatalog',
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
  },
  {
    title: 'Berita',
    path: '/',
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    // submenu: true,
    // subMenuItems: [
    //   { title: 'Account', path: '/admin/settings/account' },
    //   { title: 'Privacy', path: '/admin/settings/privacy' },
    // ],
  },
  {
    title: 'Kontak Kami',
    path: '/contact-us',
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
];

// export const SIDENAV_ITEMS_ADMIN: SideNavItem[] = [
//   {
//     title: 'Home',
//     path: '/admin/dashboard',
//     icon: <Icon icon="lucide:home" width="24" height="24" />,
//   },
//   {
//     title: 'Categories',
//     path: '/admin/categories',
//     icon: <Icon icon="lucide:folder" width="24" height="24" />,
//     // submenu: true,
//     // subMenuItems: [
//     //   { title: 'All', path: '/admin/projects' },
//     //   { title: 'Web Design', path: '/admin/projects/web-design' },
//     //   { title: 'Graphic Design', path: '/admin/projects/graphic-design' },
//     // ],
//   },
//   {
//     title: 'Products',
//     path: '/admin/products',
//     icon: <Icon icon="lucide:mail" width="24" height="24" />,
//   },
//   {
//     title: 'Settings',
//     path: '/admin/settings',
//     icon: <Icon icon="lucide:settings" width="24" height="24" />,
//     submenu: true,
//     subMenuItems: [
//       { title: 'Account', path: '/admin/settings/account' },
//       { title: 'Privacy', path: '/admin/settings/privacy' },
//     ],
//   },
//   {
//     title: 'Help',
//     path: '/admin/help',
//     icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
//   },
// ];