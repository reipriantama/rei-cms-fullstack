"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import postgres from "postgres";
import { redirect } from "next/navigation";

const sql = postgres<{}>(process.env.POSTGRES_URL!, { ssl: "require" });

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

/* ========== INVOICE ACTIONS ========== */
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath("/dashboard/invoices");
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

  // Revalidate cache dan redirect
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
