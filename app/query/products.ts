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

export async function getAllProducts(query = "", offset = 0, limit = 5) {
  if (query) {
    return await sql`
      SELECT * FROM products
      WHERE LOWER(name) LIKE ${"%" + query.toLowerCase() + "%"}
      ORDER BY name ASC
      OFFSET ${offset}
      LIMIT ${limit}
    `;
  }

  return await sql`
    SELECT * FROM products
    ORDER BY name ASC
    OFFSET ${offset}
    LIMIT ${limit}
  `;
}

export async function getProductCount(query = "") {
  if (query) {
    const result = await sql`
      SELECT COUNT(*) FROM products
      WHERE LOWER(name) LIKE ${"%" + query.toLowerCase() + "%"}
    `;
    return Number(result[0].count);
  }

  const result = await sql`SELECT COUNT(*) FROM products`;
  return Number(result[0].count);
}

export async function getProductById(id: string) {
  const result = await sql`
      SELECT * FROM products WHERE id = ${id}
    `;
  return result[0];
}
