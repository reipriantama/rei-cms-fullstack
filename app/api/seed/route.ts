import bcrypt from "bcryptjs";
import sql from "@/app/lib/db";
import { NextResponse } from "next/server";
import { products, users } from "../../lib/placeholder-data";

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (email) DO UPDATE 
        SET name = EXCLUDED.name,
        password = EXCLUDED.password,
        updated_at = CURRENT_TIMESTAMP;
      `;
    })
  );

  return insertedUsers;
}

async function seedProducts() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price INT NOT NULL,
      stock INT DEFAULT 0,
      image_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const insertedProducts = await Promise.all(
    products.map(
      (product) =>
        sql`
        INSERT INTO products (name, description, price, stock, image_url)
        VALUES (
          ${product.name},
          ${product.description},
          ${product.price},
          ${product.stock},
          ${product.image_url}
        )
        ON CONFLICT DO NOTHING;
      `
    )
  );

  return insertedProducts;
}

export async function GET() {
  try {
    await sql.begin(async () => {
      await seedUsers();
      await seedProducts();
    });

    return NextResponse.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
