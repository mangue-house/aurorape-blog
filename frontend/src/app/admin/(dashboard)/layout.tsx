import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = { title: "Admin — Aurora PE" };

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        {children}
        <div style={{ padding: "1.5rem", textAlign: "center", fontSize: "0.8rem", color: "rgba(255,255,255,0.35)" }}>
          Desenvolvido por{" "}
          <a href="https://manguehouse.com/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.55)" }}>
            Mangue House
          </a>
        </div>
      </main>
    </div>
  );
}
