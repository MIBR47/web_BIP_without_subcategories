export interface Products {
  id: number;
  catalog_id: string;
  name: string;
  slug: string;
  category_id: string;
  ecatalog_URL: string;
  // category: Categories[];
  // tkdn_pctg: number;
  // bmp_pctg: number;
  iShowedStatus: boolean;
  updatedAt: Date;
  ProductDesc: ProductDesc;
  ProductImage: ProductImage[];
}



export interface ProductsResponse {
  products: Products[];
}

export interface ProductImage {
  id: number;
  isPrimary: boolean;
  imageURL: string;
}
export interface Categories {
  id: number;
  name: string;
  slug: string;
  remarks: string;
  iStatus: boolean;
  iShowedStatus: boolean;
  imageURL: string;
  // images: CategoryImages[];
  // href: string;
  // updatedAt: Date;
}

export interface SubCategories {
  id: number;
  // catalog_id: string;
  name: string;
  slug: string;
  remarks: string;
  categoryId: string;
  iStatus: boolean;
  iShowedStatus: boolean;
  imageURL: string;
}

export interface CategoryImages {
  id: number;
  name: string;
  imageURL: string;
}

export interface ProductDesc {
  // id: string;  
  descriptions: string;
  productSpec: string;
  benefits: string;
  // benefit: string;
}

export interface PriceList {
  id: string;
  name: string;
  fileURL: string;
  iShowedStatus: boolean;
}

export interface Billboards {
  // section: number;
  // id: string;
  title: string;
  description: string;
  isImage: boolean;
  contentURL: string;
  iShowedStatus: boolean;
}

export interface BillboardContents {
  tile: string;
  contentURL: string;
}

export interface Size {
  id: number;
  name: string;
  value: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}
