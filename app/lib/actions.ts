"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import postgres from "postgres";
import { redirect } from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

/* ========== AUTH ========== */
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

/* ========== PRODUCT ACTIONS ========== */

const CreateProductSchema = z.object({
  name: z.string().min(1, "Nama produk wajib diisi."),
  description: z.string().optional(),
  price: z.coerce.number().min(1, "Harga harus lebih dari 0."),
  stock: z.coerce.number().min(0, "Stok tidak boleh negatif."),
  image_url: z.string().url().optional().or(z.literal("")),
});

export type ProductFormState = {
  errors?: {
    name?: string[];
    description?: string[];
    price?: string[];
    stock?: string[];
    image_url?: string[];
  };
  message?: string | null;
};

export async function createProduct(formData: FormData): Promise<void> {
  const validatedFields = CreateProductSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    image_url: formData.get("image_url"),
  });

  if (!validatedFields.success) {
    console.error(
      "Validation error:",
      validatedFields.error.flatten().fieldErrors
    );
    return;
  }

  const { name, description, price, stock, image_url } = validatedFields.data;

  try {
    await sql`
      INSERT INTO products (name, description, price, stock, image_url)
      VALUES (
        ${name},
        ${description || null},
        ${price},
        ${stock},
        ${image_url || null}
      )
    `;
  } catch (error) {
    console.error("Database error:", error);
    return;
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function updateProduct(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;

  const validatedFields = CreateProductSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    image_url: formData.get("image_url"),
  });

  if (!validatedFields.success) {
    console.error(
      "Validation error:",
      validatedFields.error.flatten().fieldErrors
    );
    return;
  }

  const { name, description, price, stock, image_url } = validatedFields.data;

  try {
    await sql`
      UPDATE products
      SET name = ${name},
          description = ${description || null},
          price = ${price},
          stock = ${stock},
          image_url = ${image_url || null}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error("Database error:", error);
    return;
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function deleteProduct(id: string) {
  await sql`DELETE FROM products WHERE id = ${id}`;
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}
