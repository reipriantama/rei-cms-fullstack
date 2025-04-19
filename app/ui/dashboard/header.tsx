"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Contoh: detect UUID atau angka (bisa kamu sesuaikan nanti)
function isDynamicSegment(segment: string) {
  return (
    /^[0-9a-f]{8}-[0-9a-f]{4}/.test(segment) ||
    /^[a-zA-Z0-9]{6,}$/.test(segment)
  );
}

export default function DashboardHeader() {
  const pathname = usePathname();
  const [today, setToday] = useState("");

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setToday(formatted);
  }, []);

  const getTitleFromPath = () => {
    const segments = pathname.split("/").filter(Boolean).slice(1); // skip "dashboard"

    // Filter out ID segment (UUID or slug)
    const filtered = segments.filter((seg) => !isDynamicSegment(seg));

    // Gabungkan dan kapitalisasi
    if (filtered.length === 0) return "Dashboard";

    return filtered
      .map((segment) =>
        segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())
      )
      .join(" / ");
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
      <h1 className="text-xl font-semibold text-slate-800">
        {getTitleFromPath()}
      </h1>
    </div>
  );
}
