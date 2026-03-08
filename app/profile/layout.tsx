import ProfileSidenav from "@/components/profile/ProfileSidenav";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen p-6 space-y-6">
      <h1 className="text-2xl font-bold">Perfil</h1>
      <div className="grid grid-cols-5 gap-12">
        <ProfileSidenav />
        <div className="col-span-4">{children}</div>
      </div>
    </div>
  );
}
