export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-900">
      {children}
    </div>
  );
}
