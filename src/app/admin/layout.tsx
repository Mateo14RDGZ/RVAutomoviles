export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-panel min-h-dvh bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {children}
    </div>
  );
}
