import { getAllProducts, getProductCount } from "@/app/query/products";
import ProductCard from "@/app/ui/products/productCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/ui/components/card";
import { PackageCheck } from "lucide-react";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  image_url: string | null;
};

export default async function Page() {
  const rows = await getAllProducts();
  const totalProducts = getProductCount();
  const products: Product[] = rows.map((row) => ({
    id: row.id,
    name: row.name,
    price: row.price,
    stock: row.stock,
    image_url: row.image_url,
  }));

  const recentProducts = products.slice(-4).reverse();

  return (
    <main className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <PackageCheck className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>
      </div>
      <section>
        <h2 className="text-lg font-semibold mb-2">Recently Added Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recentProducts.map((product) => (
            <Link
              key={product.id}
              href={`/dashboard/products/${product.id}`}
              className="block hover:opacity-90 transition"
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
