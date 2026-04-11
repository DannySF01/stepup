import ProfileSidenav from "@/components/profile/ProfileSidenav";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-container py-12 animate-in fade-in duration-700">
      <header className="mb-12 space-y-2 border-b border-border/40 pb-10">
        <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.4em]">
          <span>Área de Membro</span>
        </div>
        <h1 className="text-5xl font-black tracking-tighter uppercase italic text-foreground leading-none">
          Minha Conta
        </h1>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">
          Gere o teu perfil, encomendas e moradas
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <aside className="lg:col-span-3">
          <ProfileSidenav />
        </aside>

        <main className="lg:col-span-9 order-1 lg:order-2 min-h-150">
          <div className="h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
