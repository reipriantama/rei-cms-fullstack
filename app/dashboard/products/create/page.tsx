import { createProduct } from "@/app/lib/actions";
import Breadcrumbs from "@/app/ui/breadcrumbs";

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
      <h1 className="text-2xl font-semibold mb-4">Tambah Produk</h1>
      <form action={createProduct} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nama Produk"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Deskripsi"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Harga"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stok"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="image_url"
          placeholder="URL Gambar"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
