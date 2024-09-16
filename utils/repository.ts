import type { $Fetch } from 'nitropack'

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
};

export const repository = (fetch: $Fetch) => ({
  async getProducts(): Promise<Product[]> {
    return fetch<Product[]>('/products');
  },
});