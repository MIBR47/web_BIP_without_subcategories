export const routes = {
  admin: {
    dashboard: '/admin/dashboard',
  },
  home: '/',
  productlist: '/products/product-list',
  categoryList: '/categories/category-list',
  categorySlug: (categorySlug: string) => `/categories/${categorySlug}`,
  categoryId: (categoryId: string) => `/categories/${categoryId}`,
  productSlug: (productSlug: string) => `/products/${productSlug}`,
  ecatalog: '/products/eCatalog',
  beritalist: '/berita/',
  berita: (beritaSlug: string) => `/berita/${beritaSlug}`,
  // pricelist: '/products/pricelist',
  tkdn: '/products/tkdn',
  aboutcompany: '/about-us/about-company',
  directorsays: '/about-us/director',
  visimisi: '/about-us/visi-misi',
  certificate: '/about-us/certificate',
  contactus: '/contact-us'
};
