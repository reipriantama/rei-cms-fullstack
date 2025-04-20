import { getAllProducts, getProductCount } from "@/app/query/products";
import Pagination from "@/app/ui/pagination";
import { DeleteProduct, EditProduct } from "@/app/ui/products/buttonProduct";
import Search from "@/app/ui/search";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page || "1");

  const ITEMS_PER_PAGE = 5;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const products = await getAllProducts(query, offset, ITEMS_PER_PAGE);
  const totalProducts = await getProductCount(query);
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  return (
    <div>
      <div className="w-full flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Daftar Produk</h2>
        <Link
          href="/dashboard/products/create"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Tambah Produk
        </Link>
        <div>
          <Search placeholder="Cari nama produk..." />
        </div>
      </div>
      <div className="overflow-x-auto border rounded-md">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border-b">Nama</th>
              <th className="p-2 border-b">Harga</th>
              <th className="p-2 border-b">Stok</th>
              <th className="p-2 border-b">Gambar</th>
              <th className="p-2 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-2 border-b">{product.name}</td>
                <td className="p-2 border-b">
                  Rp {product.price.toLocaleString()}
                </td>
                <td className="p-2 border-b">{product.stock}</td>
                <td className="p-2 border-b">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-12 w-20 object-cover rounded"
                  />
                </td>
                <td className="border-b p-2 flex flex-col gap-2">
                  <EditProduct id={product.id} />
                  <DeleteProduct id={product.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
