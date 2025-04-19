"use client";

import { useDebouncedCallback } from "use-debounce";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const initialQuery = searchParams.get("query")?.toString() || "";
  const [search, setSearch] = useState(initialQuery);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    handleSearch(search);
  }, [search]);

  const handleClear = () => {
    setSearch("");
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative flex ">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 pr-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      {search && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
