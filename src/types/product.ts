export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: {
    url: string;
    public_id: string;
  }[];
  available: boolean;
  isFeatured: boolean;
}