import { formatCurrency } from "@/app/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/ui/components/table";
import Image from "next/image";
import { EditProduct, DeleteProduct } from "@/app/ui/products/buttonProduct";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  image_url: string;
};

type ProductTableProps = {
  products: Product[];
};

export default function ProductTable({ products }: ProductTableProps) {
  return (
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
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Image
                  width={80}
                  height={80}
                  src={product.image_url || "/placeholder.png"}
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
  );
}
