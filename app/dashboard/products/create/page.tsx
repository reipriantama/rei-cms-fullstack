import { createProduct } from "@/app/lib/actions";
import CloudinaryUpload from "@/app/ui/products/uploadImage";
import Breadcrumbs from "@/app/ui/breadcrumbs";

import { Input } from "@/app/ui/components/input";
import { Textarea } from "@/app/ui/components/textArea";
import { Button } from "@/app/ui/components/button";
import { Label } from "@/app/ui/components/label";
import Link from "next/link";

export default function AddProductPage() {
  return (
    <div className="w-full p-6 mx-auto">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Products", href: "/dashboard/products" },
          {
            label: "Create Product",
            href: "/dashboard/products/create",
            active: true,
          },
        ]}
      />
      <h1 className="text-2xl font-semibold mb-4">Add New Product</h1>

      <form action={createProduct} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" name="name" placeholder="Product Name" required />
        </div>

        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Product description"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            name="price"
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
            placeholder="Available stock"
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="image_url">Product Image</Label>
          <CloudinaryUpload />
        </div>

        <div className="flex gap-2">
          <Link href="/dashboard/products">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
