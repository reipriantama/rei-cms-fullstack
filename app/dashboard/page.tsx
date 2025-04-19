import { Card } from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
import {
  fetchLatestInvoices,
  fetchRevenue,
  fetchCardData,
} from "@/app/lib/data";
import { getAllProducts } from "../query/products";
import Link from "next/link";
import { DeleteProduct, EditProduct } from "../ui/products/buttonProduct";

export default async function Page() {
  // const revenue = await fetchRevenue();
  // const latestInvoices = await fetchLatestInvoices();
  const products = await getAllProducts();
  // const {
  //   numberOfInvoices,
  //   numberOfCustomers,
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  // } = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div> */}

      {/* 👇 Tambahan Section Produk */}
      {/* <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Daftar Produk</h2>
          <Link
            href="/dashboard/new"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Tambah Produk
          </Link>
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
      </div> */}
    </main>
  );
}
