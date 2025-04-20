import Image from "next/image";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  image_url: string | null;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="w-full h-40 bg-gray-100">
        <Image
          src={product.image_url || "/placeholder.png"}
          alt={product.name}
          width={300}
          height={160}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 space-y-1">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-600">Stok: {product.stock}</p>
        <p className="text-sm font-medium text-blue-700">
          Rp {product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
