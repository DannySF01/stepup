import UsersTable from "@/components/admin/UsersTable";
import { createServer } from "@/lib/supabase/server";
import { getPagination, getTotalPages } from "@/lib/utils/pagination";

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

  // Pagination
  const { from, to, currentPage } = getPagination(page);

  // Queries
  const supabase = await createServer();
  const search = q || "";

  const { data: profiles, count } = await supabase
    .from("profiles")
    .select("*", { count: "exact" })
    .range(from, to)
    .ilike("name", `%${search}%`);

  // Pagination
  const totalPages = getTotalPages(count);

  return (
    <div className="space-y-6 bg-card rounded-md p-9">
      <h1 className="text-xl">Utilizadores</h1>
      <UsersTable
        profiles={profiles}
        search={search}
        pagination={{ currentPage, totalPages }}
      />
    </div>
  );
}
