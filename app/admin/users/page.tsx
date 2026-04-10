import UsersTable from "@/components/admin/UsersTable";
import { createServer } from "@/lib/supabase/server";
import { getPagination, getTotalPages } from "@/lib/utils/pagination";
import { Users } from "lucide-react";

interface AdminCustomersProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
  }>;
}

export default async function AdminCustomers({
  searchParams,
}: AdminCustomersProps) {
  const { page, q } = await searchParams;
  const { from, to, currentPage } = getPagination(page);

  const supabase = await createServer();
  const search = q || "";

  const { data: profiles, count } = await supabase
    .from("profiles")
    .select("*", { count: "exact" })
    .range(from, to)
    .ilike("name", `%${search}%`);

  const totalPages = getTotalPages(count);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-widest mb-1">
          <Users size={14} />
          <span>Comunidade</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tighter text-foreground">
          Utilizadores
        </h1>
        <p className="text-sm text-muted-foreground font-medium">
          {count ?? 0}{" "}
          {count === 1 ? "utilizador registado" : "utilizadores registados"}
        </p>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
        <UsersTable
          profiles={profiles}
          search={search}
          pagination={{ currentPage, totalPages }}
        />
      </div>
    </div>
  );
}
