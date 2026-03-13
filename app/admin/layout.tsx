import { getUserWithProfile } from "@/lib/auth/getUserWithProfile";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { ToastProvider } from "@/components/ui/Toast";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile } = await getUserWithProfile();

  if (profile?.role !== "admin") redirect("/");

  return (
    <div className="flex">
      <ToastProvider>
        <AdminSidebar user={user} profile={profile} />
        <div className="p-9 w-full">{children}</div>
      </ToastProvider>
    </div>
  );
}
