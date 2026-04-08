import AdminOrdersList from "@/components/admin/AdminOrdersList";
import { createServer } from "@/lib/supabase/server";
import { getPagination, getTotalPages } from "@/lib/utils/pagination";
import { ShoppingBagIcon } from "lucide-react";

interface AdminOrdersProps {
  searchParams: {
    page: string;
    q: string;
  };
}

export default async function AdminOrders({ searchParams }: AdminOrdersProps) {
  const supabase = await createServer();

  const { page, q } = await searchParams;

  // Pagination
  const { from, to, currentPage } = getPagination(page);

  const search = q || "";

  // Queries
  const { count: total_orders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true }); // head: para pegar apenas o count sem os dados

  const query = supabase
    .from("orders")
    .select("*, order_items(*, products!inner(*, categories!inner(*)))", {
      count: "exact",
    })
    .range(from, to);

  if (search) {
    query.eq("id", search);
  }

  const { data: orders, error, count } = await query;

  if (error) {
    console.error(error.message);
  }

  const totalPages = getTotalPages(count);

  return (
    <div className="bg-card p-9 rounded-md space-y-6">
      <h1 className="text-xl ">Encomendas</h1>
      <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-md border shadow  place-self-start">
        <ShoppingBagIcon />
        <div>
          <h2 className="text-sm text-muted-foreground">Total de encomendas</h2>
          <div> {total_orders}</div>
        </div>
      </div>
      <AdminOrdersList
        orders={orders}
        pagination={{ currentPage, totalPages }}
        search={search}
      />
    </div>
  );
}
