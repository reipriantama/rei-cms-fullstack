export function ProductsTableSkeleton() {
  return (
    <div className="mt-10 animate-pulse">
      <div className="h-8 w-1/4 bg-gray-200 mb-4 rounded" />
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
            {[...Array(5)].map((_, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-2 border-b">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </td>
                <td className="p-2 border-b">
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </td>
                <td className="p-2 border-b">
                  <div className="h-4 w-8 bg-gray-200 rounded" />
                </td>
                <td className="p-2 border-b">
                  <div className="h-12 w-20 bg-gray-200 rounded" />
                </td>
                <td className="border-b p-2">
                  <div className="h-8 w-20 bg-gray-200 rounded" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
