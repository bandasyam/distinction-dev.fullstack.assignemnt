export enum ProductStatus {
  Active = "active",
  Archived = "archived",
}

export interface Product {
  id: string;
  name: string;
  price: number;
  status: ProductStatus;
  tags: string[];
}

export type ProductList = Product[];
