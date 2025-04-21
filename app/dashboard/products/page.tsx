import { Button } from "@/app/ui/components/button";
import { getAllProducts, getProductCount } from "@/app/query/products";
import Search from "@/app/ui/search";
import Link from "next/link";
import ProductTable from "@/app/ui/products/tableProduct";
import ProductPagination from "@/app/ui/products/productPagination";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  image_url: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const { query = "" } = (await searchParams) || {};
  const currentPage = Number((await searchParams)?.page || "1");

  const ITEMS_PER_PAGE = 5;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // Fetch data from API
  const fetchedProducts = await getAllProducts(query, offset, ITEMS_PER_PAGE);

  // Map the data to the correct structure
  const products: Product[] = fetchedProducts.map((product) => ({
    id: product.id, // Map fields accordingly
    name: product.name,
    price: product.price,
    stock: product.stock,
    image_url: product.image_url,
  }));

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
      <ProductTable products={products} />
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <ProductPagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
