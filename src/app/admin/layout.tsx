export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-panel min-h-dvh bg-gradient-to-b from-white via-slate-50 to-white text-slate-900">
      {children}
    </div>
  );
}
