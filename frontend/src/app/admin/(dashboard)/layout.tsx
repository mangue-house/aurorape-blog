import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = { title: "Admin — Aurora PE" };

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">{children}</main>
    </div>
  );
}
