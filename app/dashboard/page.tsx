import { getAllProducts } from "../query/products";
import ProductCard from "@/app/ui/products/productCard";
import { lusitana } from "@/app/ui/fonts";

export default async function Page() {
  const products = (await getAllProducts()).map((row) => ({
    id: row.id,
    name: row.name,
    price: row.price,
    stock: row.stock,
    image_url: row.image_url,
  }));

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
