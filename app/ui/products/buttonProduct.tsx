import { deleteProduct } from "@/app/lib/actions";
import Link from "next/link";
import { Button } from "../components/button";

export function DeleteProduct({ id }: { id: string }) {
  const deleteProductWithId = deleteProduct.bind(null, id);

  return (
    <form action={deleteProductWithId} className="w-full">
      <Button type="submit" variant="destructive" size="sm" className="w-full">
        Delete
      </Button>
    </form>
  );
}

export function EditProduct({ id }: { id: string }) {
  return (
    <Button asChild variant="default" size="sm" className="w-full">
      <Link href={`/dashboard/products/${id}`}>Edit</Link>
    </Button>
  );
}
