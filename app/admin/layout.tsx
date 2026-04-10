import { getUserWithProfile } from "@/lib/auth/getUserWithProfile";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile } = await getUserWithProfile();

  if (profile?.role !== "admin") redirect("/");

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar user={user} profile={profile} />

      <main className="flex-1 h-screen overflow-y-auto">
        <div className="p-6 md:p-8 lg:p-10 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
