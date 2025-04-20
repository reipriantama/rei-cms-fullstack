import { getAllProducts, getProductCount } from "@/app/query/products";
import { Button } from "@/app/ui/components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/ui/components/table";
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
        <Button asChild variant="default" size="sm">
          <Link href="/dashboard/products/create">Add Product +</Link>
        </Button>
        <div>
          <Search placeholder="Cari nama produk..." />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>Rp {product.price.toLocaleString()}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-12 w-20 object-cover rounded border"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-2">
                    <EditProduct id={product.id} />
                    <DeleteProduct id={product.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
