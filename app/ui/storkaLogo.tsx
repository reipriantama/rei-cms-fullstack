import { lusitana } from "./fonts";
import { MonitorSmartphone } from "lucide-react";

export default function StorkaLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <MonitorSmartphone className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">Storka</p>
    </div>
  );
}
