"use client";

import { usePathname } from "next/navigation";

function isIdSegment(segment: string) {
  return (
    /^[0-9a-f]{8}-[0-9a-f]{4}/.test(segment) ||
    /^[a-zA-Z0-9]{10,}$/.test(segment)
  );
}

export default function DashboardHeader() {
  const pathname = usePathname();

  const getTitleFromPath = () => {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length <= 1) return "Dashboard";

    const last = segments[segments.length - 1];
    const secondLast = segments[segments.length - 2];

    if (isIdSegment(last)) return capitalize(secondLast);

    if (last === "create") return `Create ${capitalize(secondLast)}`;
    if (last === "edit") return `Edit ${capitalize(secondLast)}`;

    return capitalize(last);
  };

  const capitalize = (text: string) =>
    text.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
      <h1 className="text-xl font-semibold text-slate-800">
        {getTitleFromPath()}
      </h1>
    </div>
  );
}
