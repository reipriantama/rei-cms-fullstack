import { LoaderIcon } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <LoaderIcon className="animate-spin h-12 w-12 " />
    </div>
  );
}
