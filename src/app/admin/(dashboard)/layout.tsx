import { AdminHeader } from "@/components/admin-header";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminHeader />
      <div className="mx-auto w-full max-w-7xl px-4 py-6 lg:px-6">{children}</div>
    </>
  );
}
