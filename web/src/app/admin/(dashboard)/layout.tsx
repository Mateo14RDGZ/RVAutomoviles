import { AdminHeader } from "@/components/admin-header";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminHeader />
      <div className="mx-auto max-w-3xl px-4 py-6">{children}</div>
    </>
  );
}
