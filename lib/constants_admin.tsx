import { Icon } from '@iconify/react';

import { SideNavItem } from './type';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/admin/dashboard',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: 'Kategori',
    path: '/admin/categories',
    icon: <Icon icon="lucide:layers" width="24" height="24" />,
    // submenu: true,
    // subMenuItems: [
    //   { title: 'All', path: '/admin/projects' },
    //   { title: 'Web Design', path: '/admin/projects/web-design' },
    //   { title: 'Graphic Design', path: '/admin/projects/graphic-design' },
    // ],
  },
  {
    title: 'Produk',
    path: '/admin/products',
    icon: <Icon icon="lucide:briefcase-medical" width="24" height="24" />,
  },
  {
    title: 'Berita',
    path: '/admin/news',
    icon: <Icon icon="lucide:newspaper" width="24" height="24" />,
  },
  // {
  //   title: 'Settings',
  //   path: '/admin/settings',
  //   icon: <Icon icon="lucide:settings" width="24" height="24" />,
  //   submenu: true,
  //   subMenuItems: [
  //     { title: 'Account', path: '/admin/settings/account' },
  //     { title: 'Privacy', path: '/admin/settings/privacy' },
  //   ],
  // },

];

export const SIDENAV_ITEMS_ADMIN: SideNavItem[] = [
  {
    title: 'Home',
    path: '/admin/dashboard',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: 'Categories',
    path: '/admin/categories',
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    // submenu: true,
    // subMenuItems: [
    //   { title: 'All', path: '/admin/projects' },
    //   { title: 'Web Design', path: '/admin/projects/web-design' },
    //   { title: 'Graphic Design', path: '/admin/projects/graphic-design' },
    // ],
  },
  {
    title: 'Products',
    path: '/admin/products',
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
  },
  {
    title: 'Settings',
    path: '/admin/settings',
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Account', path: '/admin/settings/account' },
      { title: 'Privacy', path: '/admin/settings/privacy' },
    ],
  },
  {
    title: 'Help',
    path: '/admin/help',
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
];