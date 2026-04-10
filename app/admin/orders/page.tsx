import AdminOrdersList from "@/components/admin/AdminOrdersList";
import { createServer } from "@/lib/supabase/server";
import { getPagination, getTotalPages } from "@/lib/utils/pagination";
import { ShoppingBag, TrendingUp } from "lucide-react";

interface AdminOrdersProps {
  searchParams: { page?: string; q?: string };
}

export default async function AdminOrders({ searchParams }: AdminOrdersProps) {
  const supabase = await createServer();
  const { page, q } = await searchParams;
  const { from, to, currentPage } = getPagination(page);
  const search = q || "";

  // Queries
  const { count: total_orders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });

  const query = supabase
    .from("orders")
    .select("*, order_items(*, products!inner(*, categories!inner(*)))", {
      count: "exact",
    })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (search) {
    query.eq("id", search);
  }

  const { data: orders, count } = await query;
  const totalPages = getTotalPages(count);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-widest mb-1">
            <ShoppingBag size={14} />
            <span>Vendas</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter text-foreground">
            Encomendas
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            Gestão e acompanhamento de pedidos dos clientes.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-card border border-border/50 p-4 rounded-2xl shadow-sm min-w-50">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Total Orders
            </p>
            <p className="text-xl font-bold tracking-tight">
              {total_orders ?? 0}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
        <AdminOrdersList
          orders={orders}
          pagination={{ currentPage, totalPages }}
          search={search}
        />
      </div>
    </div>
  );
}
