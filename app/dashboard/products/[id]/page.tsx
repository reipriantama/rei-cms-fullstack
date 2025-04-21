import { getProductById } from "@/app/query/products";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import CloudinaryUpload from "@/app/ui/products/uploadImage";

import { Input } from "@/app/ui/components/input";
import { Textarea } from "@/app/ui/components/textArea";
import { Button } from "@/app/ui/components/button";
import { Label } from "@/app/ui/components/label";
import Link from "next/link";
import { updateProduct } from "@/app/lib/actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  return (
    <div className="w-full p-6 mx-auto">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Products", href: "/dashboard/products" },
          {
            label: "Edit Product",
            href: `/dashboard/products/${product.id}`,
            active: true,
          },
        ]}
      />
      <h1 className="text-2xl font-semibold mb-4">Edit Product</h1>

      {/* Form untuk edit produk */}
      <form action={updateProduct} className="space-y-4">
        <input type="hidden" name="id" value={product.id} />
        <input
          type="hidden"
          name="image_url_old"
          value={product.image_url}
        />{" "}
        {/* Menyertakan gambar lama */}
        <div className="space-y-1">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            name="name"
            defaultValue={product.name}
            placeholder="Product Name"
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={product.description || ""}
            placeholder="Product description"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            name="price"
            defaultValue={product.price}
            placeholder="Price"
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            name="stock"
            defaultValue={product.stock}
            placeholder="Available stock"
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="image_url">Product Image</Label>
          <CloudinaryUpload defaultImage={product.image_url} />
        </div>
        <div className="flex gap-2">
          <Button type="submit">Save Changes</Button>
          <Link href="/dashboard/products">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
