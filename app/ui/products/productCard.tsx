import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/app/ui/components/card";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  image_url: string | null;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="transition hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative w-full h-40 bg-muted">
          <Image
            src={product.image_url || "/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover rounded-t-md"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-1">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-muted-foreground">Stok: {product.stock}</p>
        <p className="text-sm font-medium text-blue-600">
          Rp {product.price.toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}
