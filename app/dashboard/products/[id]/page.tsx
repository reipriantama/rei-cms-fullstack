import { getProductById } from "@/app/query/products";
import { updateProduct } from "@/app/lib/actions";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);

  return (
    <div className="max-w-xl p-6 mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Edit Produk</h1>
      <form action={updateProduct} className="space-y-4">
        <input type="hidden" name="id" value={product.id} /> {/* 👈 penting */}
        <input
          defaultValue={product.name}
          name="name"
          placeholder="Nama Produk"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          defaultValue={product.description}
          name="description"
          placeholder="Deskripsi"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          defaultValue={product.price}
          name="price"
          placeholder="Harga"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          defaultValue={product.stock}
          name="stock"
          placeholder="Stok"
          className="w-full border p-2 rounded"
          required
        />
        <input
          defaultValue={product.image_url}
          name="image_url"
          placeholder="URL Gambar"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
