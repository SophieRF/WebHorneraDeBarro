import type { IProduct } from "./product";

export interface ICategory {
  _id: string;
  name: string;
  products: IProduct[];
  image?: string;
  isFeatured?: boolean;
}