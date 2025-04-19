// import { deleteProduct } from "@/app/lib/actions";
import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteProduct } from "@/app/lib/actions";
import Link from "next/link";

export function DeleteProduct({ id }: { id: string }) {
  const deleteProductWithId = deleteProduct.bind(null, id);
  return (
    <form action={deleteProductWithId} className="w-full ">
      <button
        type="submit"
        className="w-full text-center inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Hapus
      </button>
    </form>
  );
}

export function EditProduct({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/new/${id}`}
      className="w-full text-center inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Edit
    </Link>
  );
}

// export function DeleteProduct({ id }: { id: string }) {
//   const deleteProductWithId = deleteProduct.bind(null, id);

//   return (
//     <form action={deleteProductWithId}>
//       <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
//         <span className="sr-only">Delete</span>
//         <TrashIcon className="w-4" />
//       </button>
//     </form>
//   );
// }
