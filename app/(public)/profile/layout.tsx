import ProfileSidenav from "@/components/profile/ProfileSidenav";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen p-6 space-y-6">
      <h1 className="text-2xl font-bold">Minha Conta</h1>
      <div className="grid grid-cols-5 gap-6">
        <ProfileSidenav />
        <div className="col-span-4 bg-card p-6 rounded-md">{children}</div>
      </div>
    </div>
  );
}
