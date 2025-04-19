import sql from "../lib/db";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  created_at: string;
};

export async function getAllProducts(): Promise<Product[]> {
  const result = await sql<
    Product[]
  >`SELECT * FROM products ORDER BY created_at DESC`;
  return result;
}
