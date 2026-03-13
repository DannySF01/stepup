import { getUserWithProfile } from "@/lib/auth/getUserWithProfile";
import Dashboard from "./page";
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
    <div className="flex">
      <AdminSidebar user={user} profile={profile} />
      <div className="p-6">{children}</div>
    </div>
  );
}
