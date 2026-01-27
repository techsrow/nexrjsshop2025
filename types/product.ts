// types/product.ts
export type Product = {
  id: number | string;

  name: string;
  slug: string;

  price: number; // selling price
  mrp?: number | null;

  image?: string | null;
  images?: string[] | null;

  shortDescription?: string | null;

  categoryId?: number | null;
  subCategoryId?: number | null;

  category?: { id: number; name: string; slug: string } | null;
  subCategory?: { id: number; name: string; slug: string; categoryId?: number | null } | null;

  isActive?: boolean | null;
};

export type ProductSort = "newest" | "price_asc" | "price_desc";

export type ProductListParams = {
  q?: string;
  page?: number;
  limit?: number;
  sort?: ProductSort;
  minPrice?: number;
  maxPrice?: number;

  categorySlug?: string;
  subcategorySlug?: string;
};

export type ListMeta = {
  page: number;
  limit: number;
  total: number;
  pages: number;
};

export type ProductListResult = {
  items: Product[];
  meta: ListMeta;
};
