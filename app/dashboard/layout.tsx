import SideNav from "@/app/ui/dashboard/sidenav";
import DashboardHeader from "@/app/ui/dashboard/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden ">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow flex flex-col md:overflow-y-auto">
        <div className="px-3 py-4">
          <DashboardHeader />
        </div>
        <main className="flex-grow p-2">{children}</main>
      </div>
    </div>
  );
}
